import { NoteDao } from '@/lib/dao/note';
import { expect, test } from 'vitest';

test('getNoteDetail should return the note detail', async () => {
	// Arrange
	const noteDao = new NoteDao();
	const noteId = '123';

	// Act
	const noteDetail = await noteDao.getNoteDetail(noteId);

	// Assert
	expect(noteDetail).toEqual({
		noteId: '123',
		title: 'Sample Note',
		tags: 'typescript, testing',
		content: 'This is a sample note.',
	});
});
