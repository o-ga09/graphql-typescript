// mysql２でに接続するコード書く
import { createNote, deleteNote, getNote, GetNoteRow, getNotes, updateNote } from '@/generated/driver/query_sql';
import mysql from 'mysql2/promise';

export class NoteDao {
	private connection: mysql.Connection;

	constructor(connection: mysql.Connection) {
		this.connection = connection;
	}

	async getNoteList(userId: string): Promise<GetNoteRow[]> {
		const res = await getNotes(this.connection, { userId: userId });
		return res;
	}

	async getNoteDetail(noteId: string): Promise<GetNoteRow | null> {
		const res = await getNote(this.connection, { noteId: noteId });
		return res;
	}

	async updateNote(param: { noteId: string; title: string; tags: string; content: string }): Promise<void> {
		try {
			await updateNote(this.connection, {
				noteId: param.noteId,
				title: param.title,
				tags: param.tags,
				content: param.content,
			});
		} catch (e) {
			console.error(e);
			throw new Error('更新に失敗しました');
		}
	}

	async createNote(param: { noteId: string; title: string; tags: string; content: string }): Promise<void> {
		try {
			await createNote(this.connection, {
				noteId: param.noteId,
				title: param.title,
				tags: param.tags,
				content: param.content,
			});
		} catch (e) {
			console.error(e);
			throw new Error('登録に失敗しました');
		}
	}

	async deleteNote(noteId: string): Promise<void> {
		try {
			await deleteNote(this.connection, { noteId: noteId });
		} catch (e) {
			console.error(e);
			throw new Error('削除に失敗しました');
		}
	}
}
