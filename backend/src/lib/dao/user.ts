import mysql from 'mysql2/promise';
import { GetUserRow, getUsers, getUser, updateUser, createUser, deleteUser } from '../../generated/driver/query_sql';

export class UserDao {
	private connection: mysql.Connection;
	constructor(connection: mysql.Connection) {
		this.connection = connection;
	}

	async getUserList(): Promise<GetUserRow[]> {
		const res = await getUsers(this.connection);
		return res;
	}

	async getUserDetail(userId: string): Promise<GetUserRow | null> {
		const res = await getUser(this.connection, { userId: userId });
		return res;
	}

	async updateUser(param: { userId: string; name: string; displayname: string }): Promise<void> {
		try {
			await updateUser(this.connection, {
				userId: param.userId,
				name: param.name,
				displayname: param.name,
			});
		} catch (e) {
			console.error(e);
			throw new Error('更新に失敗しました');
		}
	}

	async createUser(param: { userId: string; name: string; displayname: string }): Promise<void> {
		try {
			await createUser(this.connection, {
				userId: param.userId,
				name: param.name,
				displayname: param.name,
			});
		} catch (e) {
			console.error(e);
			throw new Error('登録に失敗しました');
		}
	}

	async deleteUser(userId: string): Promise<void> {
		try {
			await deleteUser(this.connection, { userId: userId });
		} catch (e) {
			console.error(e);
			throw new Error('削除に失敗しました');
		}
	}
}
