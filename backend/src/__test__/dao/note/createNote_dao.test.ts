import { NoteDao } from '@/lib/dao/note';
import { expect, test } from 'vitest';

test('createNote should create a new note', async () => {
	// Arrange
	const noteDao = new NoteDao();
	const noteId = '123';
	const title = 'Sample Note';
	const tags = 'sample, test';
	const content = 'This is a sample note content';

	// Act
	await noteDao.createNote({
		noteId: noteId,
		title: title,
		tags: tags,
		content: content,
	});

	// Assert
	const createdNote = await noteDao.getNoteDetail(noteId);
	expect(createdNote).toEqual({
		noteId: noteId,
		title: title,
		tags: tags,
		content: content,
	});
});
