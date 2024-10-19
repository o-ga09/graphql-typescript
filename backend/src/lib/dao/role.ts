import { createRole, deleteRole, getRole, GetRoleRow, getRoles, updateRole } from '@/generated/driver/query_sql';
import mysql from 'mysql2/promise';
import { generateUlid } from '../generateID/generateid';

export class RoleDao {
	private connection: mysql.Connection;
	constructor(connection: mysql.Connection) {
		this.connection = connection;
	}

	async getRoleList(): Promise<GetRoleRow[]> {
		const res = await getRoles(this.connection);
		return res;
	}

	async getRoleDetail(roleId: string): Promise<GetRoleRow | null> {
		const res = await getRole(this.connection, { roleId: roleId });
		return res;
	}

	async updateRole(param: { roleId: string; roleName: string }): Promise<void> {
		try {
			await updateRole(this.connection, {
				roleId: param.roleId,
				roleName: param.roleName,
			});
		} catch (e) {
			console.error(e);
			throw new Error('更新に失敗しました');
		}
	}

	async createRole(param: { roleName: string }): Promise<string> {
		try {
			const roleId = generateUlid();
			await createRole(this.connection, {
				roleId: roleId,
				roleName: param.roleName,
			});
			return roleId;
		} catch (e) {
			console.error(e);
			throw new Error('登録に失敗しました');
		}
	}

	async deleteRole(roleId: string): Promise<void> {
		try {
			await deleteRole(this.connection, { roleId: roleId });
		} catch (e) {
			console.error(e);
			throw new Error('削除に失敗しました');
		}
	}
}
