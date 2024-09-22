import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';
import { createTestServer } from '@/lib/testUtil/testServer'; // testServer.tsのパスに合わせて変更
import { GenericContainer, Wait } from 'testcontainers';
import { createPool } from 'mysql2/promise';
import path from 'path';

let httpServer;
let container;

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
	await connection.query(`
			INSERT INTO users (user_id, name, email, password, address, sex, birthday) VALUES
			('999', 'testuser', 'hoge@example.com', 'xxx', 'yyy', 1, '2024-09-18');
		`);

	await connection.query(`
			INSERT INTO notes (note_id, title, tags, content) VALUES
			('1', 'Test Note', 'test', 'This is a test note');
		`);
	await connection.query(`
			INSERT INTO user_notes (
			    user_id,
 				note_id
			) VALUES ('999', '1');
		`);

	console.log('Test data inserted');

	httpServer = await createTestServer({
		host: container.getHost(),
		port: container.getMappedPort(3306),
		user: 'user',
		password: 'pass',
		dbname: 'testdb',
	});
	httpServer.listen(4000, () => {
		console.log('Test server running on port 4000');
	});
});

afterAll(async () => {
	httpServer.close();
});

describe('GraphQL API', () => {
	it('should create an author', async () => {
		const mutation = `
      mutation {
        createAuthor(name: "Test Author") {
          id
          name
          posts {
            id
            title
            content
            tags {
              name
            }
          }
        }
      }
    `;

		const response = await request(httpServer).post('/graphql').send({ query: mutation });

		expect(response.status).toBe(200);
	});

	it('should update an author', async () => {
		const mutation = `
      mutation {
        updateAuthor(id: "1", name: "Updated Author") {
          id
          name
          posts {
            id
            title
            content
            tags {
              name
            }
          }
        }
      }
    `;

		const response = await request(httpServer).post('/graphql').send({ query: mutation });

		expect(response.status).toBe(200);
	});

	it('should delete an author', async () => {
		const mutation = `
      mutation {
        deleteAuthor(id: "1") {
          id
          name
          posts {
            id
            title
            content
            tags {
              name
            }
          }
        }
      }
    `;

		const response = await request(httpServer).post('/graphql').send({ query: mutation });

		expect(response.status).toBe(200);
	});

	// 他のテストケースも同様に追加できます
});
