import { NoteDao } from '@/lib/dao/note';
import { expect, test } from 'vitest';

test('deleteNote should delete the note', async () => {
	// Arrange
	const noteDao = new NoteDao();
	const noteId = '123';

	// Act
	await noteDao.deleteNote(noteId);

	// Assert
	const deletedNote = await noteDao.getNoteDetail(noteId);
	expect(deletedNote).toBeNull();
});
