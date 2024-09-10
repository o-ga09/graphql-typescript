import { expect, test } from 'vitest';
import { NoteDao } from '@/lib/dao/note';

test('updateNote should update the note', async () => {
	// Arrange
	const noteDao = new NoteDao();
	const noteId = '123';
	const updatedTitle = 'Updated Title';
	const updatedTags = 'Updated Tags';
	const updatedContent = 'Updated Content';

	// Act
	await noteDao.updateNote({
		noteId: noteId,
		title: updatedTitle,
		tags: updatedTags,
		content: updatedContent,
	});

	// Assert
	const updatedNote = await noteDao.getNoteDetail(noteId);
	expect(updatedNote).toEqual({
		noteId: noteId,
		title: updatedTitle,
		tags: updatedTags,
		content: updatedContent,
	});
});
