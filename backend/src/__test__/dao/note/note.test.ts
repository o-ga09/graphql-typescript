import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { GenericContainer, Wait } from 'testcontainers';
import { NoteDao } from '@/lib/dao/note';
import { createPool } from 'mysql2/promise';
import path from 'path';

describe('NoteDao Tests', () => {
	let container;
	let noteDao: NoteDao;

	beforeAll(async () => {
		container = await new GenericContainer('mysql')
			.withEnvironment({
				MYSQL_ROOT_PASSWORD: 'root',
				MYSQL_DATABASE: 'testdb',
				MYSQL_USER: 'user',
				MYSQL_PASSWORD: 'pass',
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
			INSERT INTO notes (note_id, title, tags, content) VALUES
			('1', 'Test Note', 'test', 'This is a test note');
		`);

		noteDao = new NoteDao(connection);
	});

	afterAll(async () => {
		if (container) {
			await container.stop();
		}
	});

	test('createNote should create a note', async () => {
		const note = { noteId: '2', title: 'Test Note', tags: 'test', content: 'This is a test note' };
		await noteDao.createNote(note);
		const result = await noteDao.getNoteDetail('2');
		expect(result).toEqual(note);
	});

	test('getNoteList should return a list of notes', async () => {
		const notes = await noteDao.getNoteList('d4a6e9b6-f079-45c9-b6d0-565cf4280596');
		expect(notes.length).toBeGreaterThan(0);
	});

	test('getNoteDetail should return a note detail', async () => {
		const note = await noteDao.getNoteDetail('d4a6e9b6-f079-45c9-b6d0-565cf4280522');
		expect(note).toEqual({
			id: 1,
			noteId: 'd4a6e9b6-f079-45c9-b6d0-565cf4280522',
			noteId_2: 'd4a6e9b6-f079-45c9-b6d0-565cf4280522',
			title: 'Welcome to Note App',
			tags: 'tag_a,tag_b,tag_c',
			content: 'This is a note app',
			createdAt: new Date('2020-12-31T15:00:00.000Z'),
			updatedAt: new Date('2020-12-31T15:00:00.000Z'),
			userId: 'd4a6e9b6-f079-45c9-b6d0-565cf4280596',
		});
	});

	test('updateNote should update a note', async () => {
		const updatedNote = { noteId: '1', title: 'Updated Note', tags: 'updated', content: 'This is an updated note' };
		await noteDao.updateNote(updatedNote);
		const result = await noteDao.getNoteDetail('1');
		expect(result).toEqual(updatedNote);
	});

	test('deleteNote should delete a note', async () => {
		await noteDao.deleteNote('1');
		const result = await noteDao.getNoteDetail('1');
		expect(result).toBeNull();
	});
});
