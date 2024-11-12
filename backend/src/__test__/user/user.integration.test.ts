import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';
import { createTestServer } from '../../lib/testUtil/testServer'; // testServer.tsのパスに合わせて変更
import { GenericContainer, Wait } from 'testcontainers';
import { createPool } from 'mysql2/promise';
import path from 'path';
import { NoteDao } from '../../lib/dao/note';
import { UserDao } from '../../lib/dao/user';

let httpServer;
let container;
let noteDao: NoteDao;
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

	const pool = await createPool({
		host: container.getHost(),
		port: container.getMappedPort(3306),
		user: 'user',
		password: 'pass',
		database: 'testdb',
	});

	const connection = await pool.getConnection();
	noteDao = new NoteDao(connection);
	userDao = new UserDao(connection);
	// テストデータ挿入
	await userDao.createUser({ ...defaultUser, userId: 'test-1' });
	await userDao.createUser({ ...defaultUser, userId: 'test-2' });
	await userDao.createUser({ ...defaultUser, userId: 'test-3' });
	await userDao.createUser({ ...defaultUser, userId: 'test-4' });
	await noteDao.createNote({ ...defaultNote, userId: 'test-1' });
	await noteDao.createNote({ ...defaultNote, userId: 'test-2' });
	await noteDao.createNote({ ...defaultNote, userId: 'test-3' });

	httpServer = await createTestServer({
		host: container.getHost(),
		port: container.getMappedPort(3306),
		user: 'user',
		password: 'pass',
		dbname: 'testdb',
	});
	httpServer.listen(4000, () => {});
});

afterAll(async () => {
	httpServer.close();
});

describe('GraphQL API', () => {
	describe('Query  User', () => {
		it('登録されているユーザー一覧情報を取得できること', async () => {
			const query = {
				query: `
				query GetUsers {
					getUsers {
						userId
						username
						displayname
					}
					}
				`,
			};
			const response = await request(httpServer).post('/graphql').send(query);
			expect(response.status).toBe(200);
		});
		it('ユーザーIDでユーザーの詳細情報を取得できること', async () => {
			const query = {
				query: `
					query GetUser($getUserId: ID!) {
						getUser(id: $getUserId) {
							userId
							username
							displayname
						}
					}
				`,
			};
			const response = await request(httpServer).post('/graphql').send(query);
			expect(response.status).toBe(200);
		});
	});
	describe('Mutation User', () => {
		it('ユーザーが作成できること', async () => {
			const mutation = {
				query: `
					mutation CreateUser($userId: String!, $username: String!, $displayname: String!) {
						createUser(userId: $userId, username: $username, displayname: $displayname) {
							userId
							username
							displayname
						}
					}	
				`,
				variables: { userId: 'test-4', username: 'testuser', displayname: 'Test User' },
			};
			const response = await request(httpServer).post('/graphql').send(mutation);
			expect(response.status).toBe(200);
		});
		it('ユーザーの情報が更新できること', async () => {
			const mutation = {
				query: `
					mutation UpdateUser($userId: ID!, $displayname: String!, $username: String) {
						updateUser(userId: $userId, displayname: $displayname, username: $username) {
							userId
							username
							displayname
						}
					}
				`,
				variables: { userId: 'test-4', username: 'testuser', displayname: 'Test User' },
			};
			const response = await request(httpServer).post('/graphql').send(mutation);
			expect(response.status).toBe(200);
		});
		it('ユーザーの情報が削除できること', async () => {
			const mutation = {
				query: `
					mutation DeleteUser($userId: ID!) {
						deleteUser(userId: $userId)
					}
				`,
				variables: { noteId: 'test-4' },
			};
			const response = await request(httpServer).post('/graphql').send(mutation);
			expect(response.status).toBe(200);
		});
	});
});

// テストデータ
const defaultUser = {
	userId: 'd4a6e9b6-f079-45c9-b6d0-565cf4280596',
	name: 'testuser',
	displayname: 'Test User',
};

const defaultNote = {
	title: 'Welcome to Note App',
	tags: 'tag_a,tag_b,tag_c',
	content: 'This is a note app',
	createdAt: '2020-12-31T15:00:00.000Z',
	updatedAt: '2020-12-31T15:00:00.000Z',
	userId: 'd4a6e9b6-f079-45c9-b6d0-565cf4280596',
};
