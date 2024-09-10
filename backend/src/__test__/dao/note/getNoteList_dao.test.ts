import { NoteDao } from '@/lib/dao/note';
import { expect, test } from 'vitest';

test('getNoteList should return the list of notes for a given user', async () => {
	// Arrange
	const noteDao = new NoteDao();
	const userId = '123';

	// Act
	const noteList = await noteDao.getNoteList(userId);

	// Assert
	expect(Array.isArray(noteList)).toBe(true);
	expect(noteList.length).toBeGreaterThan(0);
	expect(noteList[0]).toHaveProperty('noteId');
	expect(noteList[0]).toHaveProperty('title');
	expect(noteList[0]).toHaveProperty('tags');
	expect(noteList[0]).toHaveProperty('content');
});
