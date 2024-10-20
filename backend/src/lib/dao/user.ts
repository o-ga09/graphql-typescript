import mysql from 'mysql2/promise';
import {
	GetUserRow,
	getUsers,
	getUser,
	updateUser,
	createUser,
	deleteUser,
	getUserByEmail,
	GetUserByEmailRow,
} from '@/generated/driver/query_sql';

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

	async updateUser(param: {
		userId: string;
		name: string;
		email: string;
		address: string;
		sex: number;
		birthday: string;
		password: string;
		role: string;
	}): Promise<void> {
		try {
			await updateUser(this.connection, {
				userId: param.userId,
				name: param.name,
				email: param.email,
				address: param.address,
				sex: param.sex,
				birthday: param.birthday,
				password: param.password,
				role: param.role,
			});
		} catch (e) {
			console.error(e);
			throw new Error('更新に失敗しました');
		}
	}

	async createUser(param: {
		userId: string;
		name: string;
		email: string;
		address: string;
		sex: number;
		birthday: string;
		password: string;
		roleId: string;
	}): Promise<void> {
		try {
			await createUser(this.connection, {
				userId: param.userId,
				name: param.name,
				email: param.email,
				address: param.address,
				sex: param.sex,
				birthday: param.birthday,
				password: param.password,
				role: param.roleId,
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

	async getUserByEmail(email: string): Promise<GetUserByEmailRow | null> {
		const res = await getUserByEmail(this.connection, { email: email });
		return res;
	}
}
