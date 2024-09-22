// mysql２でに接続するコード書く
import {
	createNote,
	createUserNote,
	deleteNote,
	getNote,
	GetNoteRow,
	getNotes,
	updateNote,
} from '@/generated/driver/query_sql';
import mysql from 'mysql2/promise';
import { generateUlid } from '../generateID/generateid';

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

	async createNote(param: { title: string; tags: string; content: string; userId: string }): Promise<string> {
		try {
			const noteid = generateUlid();
			await createNote(this.connection, {
				noteId: noteid,
				title: param.title,
				tags: param.tags,
				content: param.content,
			});
			await createUserNote(this.connection, { noteId: noteid, userId: param.userId });
			return noteid;
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
