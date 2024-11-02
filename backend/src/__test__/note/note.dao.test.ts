import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { GenericContainer, Wait } from 'testcontainers';
import { NoteDao } from '@/lib/dao/note';
import { createPool } from 'mysql2/promise';
import path from 'path';
import { UserDao } from '@/lib/dao/user';

describe('NoteDao Tests', () => {
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
		noteDao = new NoteDao(connection);
		userDao = new UserDao(connection);
		await userDao.createUser({ ...defaultUser, userId: 'test-1' });
		await userDao.createUser({ ...defaultUser, userId: 'test-2' });
		await userDao.createUser({ ...defaultUser, userId: 'test-3' });
		await userDao.createUser({ ...defaultUser, userId: 'test-4' });
		await noteDao.createNote({ ...defaultNote, userId: 'test-1' });
		await noteDao.createNote({ ...defaultNote, userId: 'test-2' });
		await noteDao.createNote({ ...defaultNote, userId: 'test-3' });
	});

	afterAll(async () => {
		if (container) {
			await container.stop();
		}
	});

	test('createNote should create a note', async () => {
		const note = {
			title: 'Test Note',
			tags: 'test',
			content: 'This is a test note',
			userId: 'test-4',
		};
		const newNoteId = await noteDao.createNote(note);
		const result = await noteDao.getNoteDetail(newNoteId);
		expect(result.noteId).toBe(newNoteId);
		expect(result.title).toBe(note.title);
		expect(result.tags).toBe(note.tags);
		expect(result.content).toBe(note.content);
	});

	test('getNoteList should return a list of notes', async () => {
		const notes = await noteDao.getNoteList('test-1');
		expect(notes).toHaveLength(1);
	});

	test('getNoteDetail should return a note detail', async () => {
		const notes = await noteDao.getNoteList('test-1');
		const noteId = notes[0].noteId;
		const note = await noteDao.getNoteDetail(noteId);
		expect(note).toEqual({
			id: notes[0].id,
			noteId: notes[0].noteId,
			title: notes[0].title,
			tags: notes[0].tags,
			content: notes[0].content,
			createdAt: notes[0].createdAt,
			updatedAt: notes[0].updatedAt,
			userId: notes[0].userId,
			name: notes[0].name,
			displayname: notes[0].displayname,
		});
	});

	test('updateNote should update a note', async () => {
		const before = await noteDao.getNoteList('test-1');
		await noteDao.updateNote({
			title: before[0].title,
			tags: before[0].tags,
			content: 'This is an updated note',
			noteId: before[0].noteId,
		});
		const result = await noteDao.getNoteDetail(before[0].noteId);
		expect(result.id).toBeGreaterThan(0);
		expect(result.noteId).toBe(before[0].noteId);
		expect(result.title).toBe(before[0].title);
		expect(result.tags).toBe(before[0].tags);
		expect(result.content).toBe('This is an updated note');
	});

	test('deleteNote should delete a note', async () => {
		const notes = await noteDao.getNoteList('test-2');
		await noteDao.deleteNote(notes[0].noteId);
		const result = await noteDao.getNoteDetail(notes[0].noteId);
		expect(result).toBeNull();
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
