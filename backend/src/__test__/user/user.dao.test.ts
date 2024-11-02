import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { GenericContainer, Wait } from 'testcontainers';
import { UserDao } from '@/lib/dao/user';
import { createPool } from 'mysql2/promise';
import path from 'path';

describe('UserDao Tests', () => {
	let container;
	let userDao: UserDao;

	beforeAll(async () => {
		container = await new GenericContainer('mysql')
			.withEnvironment({
				MYSQL_ROOT_PASSWORD: 'root',
				MYSQL_DATABASE: 'testdb',
				MYSQL_USER: 'user',
				MYSQL_PASSWORD: 'pass',
				TZ: 'Asia/Tokyo',
			})
			.withBindMounts([
				{
					target: '/docker-entrypoint-initdb.d',
					source: path.resolve(__dirname, '../../../db/mysql/init'),
				},
				{
					target: '/etc/mysql/conf.d/my.cnf',
					source: path.resolve(__dirname, '../../../db/mysql/conf.d/my.cnf'),
				},
			])
			.withExposedPorts(3306)
			.withWaitStrategy(Wait.forListeningPorts())
			.start();

		console.log(`MySQL container started on port ${container.getMappedPort(3306)}`);

		const pool = await createPool({
			host: container.getHost(),
			port: container.getMappedPort(3306),
			user: 'user',
			password: 'pass',
			database: 'testdb',
		});

		const connection = await pool.getConnection();

		// テストデータ挿入
		userDao = new UserDao(connection);
		await userDao.createUser({ ...defaultUser, userId: 'test-1' });
		await userDao.createUser({ ...defaultUser, userId: 'test-2' });
		await userDao.createUser({ ...defaultUser, userId: 'test-3' });
	});

	afterAll(async () => {
		if (container) {
			await container.stop();
		}
	});

	test('createUser should create a user', async () => {
		const user = {
			userId: 'test-4',
			name: 'Another User',
			displayname: 'Another User',
		};
		await userDao.createUser(user);
		const result = await userDao.getUserDetail('test-4');
		expect(result.userId).toEqual(user.userId);
		expect(result.name).toEqual(user.displayname);
	});

	test('getUserList should return a list of users', async () => {
		const users = await userDao.getUserList();
		expect(users).toHaveLength(4);
	});

	test('getUserDetail should return a user detail', async () => {
		const user = await userDao.getUserDetail('test-1');
		expect(user.id).toBeGreaterThan(0);
		expect(user.userId).toEqual('test-1');
		expect(user.name).toEqual('Test User');
		expect(user.displayname).toEqual('Test User');
	});

	test('updateUser should update a user', async () => {
		const updatedUser = {
			userId: 'test-2',
			name: 'Updated User',
			displayname: 'Updated User',
		};
		await userDao.updateUser(updatedUser);
		const result = await userDao.getUserDetail('test-2');
		expect(result.id).toBeGreaterThan(0);
		expect(result.userId).toEqual(updatedUser.userId);
		expect(result.name).toEqual(updatedUser.name);
		expect(result.displayname).toEqual(updatedUser.displayname);
	});

	test('deleteUser should delete a user', async () => {
		await userDao.deleteUser('test-1');
		const result = await userDao.getUserDetail('1');
		expect(result).toBeNull();
	});
});

// テストデータ
const defaultUser = {
	userId: '1',
	name: 'Test User',
	displayname: 'Test User',
};
