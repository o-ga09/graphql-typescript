import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';
import { createTestServer } from '../../lib/testUtil/testServer';
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

	// テストデータ挿入
	noteDao = new NoteDao(connection);
	userDao = new UserDao(connection);
	await userDao.createUser({ ...defaultUser, userId: 'test-1' });
	await userDao.createUser({ ...defaultUser, userId: 'test-2' });
	await userDao.createUser({ ...defaultUser, userId: 'test-3' });
	await userDao.createUser({ ...defaultUser, userId: 'test-4' });
	await noteDao.createNote({ ...defaultNote, userId: 'test-1' });
	await noteDao.createNote({ ...defaultNote, userId: 'test-2' });
	await noteDao.createNote({ ...defaultNote, userId: 'test-3' });

	httpServer = await createTestServer();
	httpServer.listen(4000, () => {});
});

afterAll(async () => {
	await httpServer.close();
	if (container) {
		await container.stop();
	}
});

describe('GraphQL API', () => {
	describe('Query', () => {
		it('ノートIDからノートの詳細情報を取得できること', async () => {
			const query = {
				query: `
				query GetNoteById($getNoteByIdId: ID!) {
					getNoteById(id: $getNoteByIdId) {
						note {
						noteId
						title
						content
						createdAt
						updatedAt
						tags {
							name
						}
						}
						author {
						userId
						username
						displayname
						}
					}
					}
				`,
				variables: { getNoteByIdId: 'test-1' },
			};

			const response = await request(httpServer).post('/graphql').send(query);
			console.log(response.error);
			expect(response.status).toBe(200);
		});
		it('ユーザーIDに紐づくノート一覧情報を取得できること', async () => {
			const query = {
				query: `
					query GetNotes($userId: ID!) {
						getNotes(userId: $userId) {
							count
							notes {
							noteId
							title
							content
							createdAt
							updatedAt
							tags {
								name
							}
							}
							author {
							userId
							username
							displayname
							}
						}
					}
				`,
				variables: { userId: 'test-1' },
			};
			const response = await request(httpServer).post('/graphql').send(query);
			expect(response.status).toBe(200);
		});
	});
	describe('Mutation', () => {
		it('ノートが作成できること', async () => {
			const mutation = {
				query: `
					mutation CreateNote($userId: String!, $title: String!, $content: String!, $tags: [String!]!) {
							createNote(userId: $userId, title: $title, content: $content, tags: $tags) {
								noteId
								title
								content
								createdAt
								updatedAt
								tags {
								name
								}
							}
						}
				`,
				variables: {
					userId: 'test-4',
					title: 'Welcome to Note App',
					content: 'This is a note app',
					tags: 'tag_a,tag_b,tag_c',
				},
			};
			const response = await request(httpServer).post('/graphql').send(mutation);
			expect(response.status).toBe(200);
		});
		it('ノートの情報が更新できること', async () => {
			const mutation = {
				query: `
					mutation UpdateNote($noteId: ID!, $tags: [String!]!, $title: String, $content: String) {
						updateNote(noteId: $noteId, tags: $tags, title: $title, content: $content) {
							noteId
							title
							content
							createdAt
							updatedAt
							tags {
							name
							}
						}
					}
				`,
				variables: {
					userId: 'test-4',
					title: 'Welcome to Note App',
					content: 'This is a note app',
					tags: 'tag_a,tag_b,tag_c',
				},
			};
			const response = await request(httpServer).post('/graphql').send(mutation);
			expect(response.status).toBe(200);
		});
		it('ノートの情報が削除できること', async () => {
			const mutation = {
				query: `
					mutation DeleteNote($noteId: ID!) {
						deleteNote(noteId: $noteId)
					}
				`,
				variables: { userId: 'test-4' },
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
