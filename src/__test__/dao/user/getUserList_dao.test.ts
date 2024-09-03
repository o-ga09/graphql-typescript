import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers';
import { UserDao } from '@/lib/dao/user';

describe('getUserList', async () => {
	let container: StartedTestContainer;
	beforeAll(async () => {
		// MySQL コンテナを起動
		try {
			container = await new GenericContainer('mysql:8.0')
				.withEnvironment({
					MYSQL_ROOT_PASSWORD: 'password',
					MYSQL_DATABASE: 'testdb',
					MYSQL_USER: 'user',
					MYSQL_PASSWORD: 'password',
				})
				.withExposedPorts(3306)
				// TCPポートが利用可能になるまで待機
				.withWaitStrategy(Wait.forListeningPorts())
				.start();
		} catch (e) {
			console.error(e);
			throw new Error('MySQL container failed to start');
		}
		console.log('MySQL container started');
	});

	afterAll(async () => {
		// MySQL コンテナを停止
		await container.stop();
	});

	beforeEach(async () => {
		// テストデータを挿入
		const userDao = new UserDao();
		await userDao.createUser({
			userId: 'test1',
			name: 'test1',
			email: '',
			address: '',
			birthday: '',
			sex: 0,
			password: '',
		});
		await userDao.createUser({
			userId: 'test2',
			name: 'test2',
			email: '',
			address: '',
			birthday: '',
			sex: 0,
			password: '',
		});
		await userDao.createUser({
			userId: 'test3',
			name: 'test3',
			email: '',
			address: '',
			birthday: '',
			sex: 0,
			password: '',
		});
	});

	afterEach(async () => {
		// テストデータを削除
		const userDao = new UserDao();
		await userDao.deleteUser('test1');
		await userDao.deleteUser('test2');
		await userDao.deleteUser('test3');
	});

	test('getUserList should return an array of users', async () => {
		// Arrange
		const userDao = new UserDao();

		// Act
		const userList = await userDao.getUserList();

		// Assert
		expect(Array.isArray(userList)).toBe(true);
	});

	test('getUserList should return the correct number of users', async () => {
		// Arrange
		const userDao = new UserDao();

		// Act
		const userList = await userDao.getUserList();

		// Assert
		expect(userList.length).toBe(3); // Replace 3 with the expected number of users
	});

	test('getUserList should return users with valid properties', async () => {
		// Arrange
		const userDao = new UserDao();

		// Act
		const userList = await userDao.getUserList();

		// Assert
		userList.forEach((user) => {
			expect(user).toHaveProperty('userId');
			expect(user).toHaveProperty('name');
			expect(user).toHaveProperty('email');
			expect(user).toHaveProperty('address');
			expect(user).toHaveProperty('sex');
			expect(user).toHaveProperty('birthday');
			expect(user).toHaveProperty('password');
		});
	});
});
