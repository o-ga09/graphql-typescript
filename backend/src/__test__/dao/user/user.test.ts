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
					source: path.resolve(__dirname, '../../../../db/mysql/init'),
				},
				{
					target: '/etc/mysql/conf.d/my.cnf',
					source: path.resolve(__dirname, '../../../../db/mysql/conf.d/my.cnf'),
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
		await connection.query(`
            INSERT INTO users (user_id, name, email, address, sex, birthday, password) VALUES
                ('1', 'Test User', 'test@example.com', '123 Test St', 1, '1990-01-01', 'password');
        `);

		userDao = new UserDao(connection);
	});

	afterAll(async () => {
		if (container) {
			await container.stop();
		}
	});

	test('createUser should create a user', async () => {
		const user = {
			userId: '2',
			name: 'Another User',
			email: 'another@example.com',
			address: '456 Another St',
			sex: 2,
			birthday: '1992-02-02',
			password: 'password',
		};
		await userDao.createUser(user);
		const result = await userDao.getUserDetail('2');
		expect(result.userId).toEqual(user.userId);
		expect(result.name).toEqual(user.name);
		expect(result.email).toEqual(user.email);
		expect(result.address).toEqual(user.address);
		expect(result.birthday).toEqual(user.birthday);
		expect(result.password).toEqual(user.password);
		expect(result.sex).toEqual(user.sex);
	});

	test('getUserList should return a list of users', async () => {
		const users = await userDao.getUserList();
		expect(users.length).toBeGreaterThan(0);
	});

	test('getUserDetail should return a user detail', async () => {
		const user = await userDao.getUserDetail('1');
		expect(user.id).toBeGreaterThan(0);
		expect(user.userId).toEqual('1');
		expect(user.name).toEqual('Test User');
		expect(user.email).toEqual('test@example.com');
		expect(user.address).toEqual('123 Test St');
		expect(user.sex).toEqual(1);
		expect(user.birthday).toEqual('1990-01-01');
		expect(user.password).toEqual('password');
	});

	test('updateUser should update a user', async () => {
		const updatedUser = {
			userId: '1',
			name: 'Updated User',
			email: 'updated@example.com',
			address: '789 Updated St',
			sex: 1,
			birthday: '1990-01-01',
			password: 'newpassword',
		};
		await userDao.updateUser(updatedUser);
		const result = await userDao.getUserDetail('1');
		expect(result.id).toBeGreaterThan(0);
		expect(result.userId).toEqual(updatedUser.userId);
		expect(result.name).toEqual(updatedUser.name);
		expect(result.email).toEqual(updatedUser.email);
		expect(result.address).toEqual(updatedUser.address);
		expect(result.birthday).toEqual(updatedUser.birthday);
		expect(result.password).toEqual(updatedUser.password);
		expect(result.sex).toEqual(updatedUser.sex);
	});

	test('deleteUser should delete a user', async () => {
		await userDao.deleteUser('1');
		const result = await userDao.getUserDetail('1');
		expect(result).toBeNull();
	});
});
