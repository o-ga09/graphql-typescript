/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
import { AuthPayload, Note, PostTag, Resolvers, Role, User } from '@/generated/graphql';
import fs from 'fs';
import { NoteDao } from './dao/note';
import { UserDao } from './dao/user';
import { generateUlid } from './generateID/generateid';
import jwt from 'jsonwebtoken';
import { RoleDao } from './dao/role';
import { GetUserRow } from '@/generated/driver/query_sql';

export const typeDefs = fs.readFileSync('./schema.graphql', {
	encoding: 'utf8',
});

export const resolvers: Resolvers = {
	Query: {
		getUser: async (_, { id }, { dbconnection }) => {
			const userDao = new UserDao(dbconnection);
			const user = await userDao.getUserDetail(id);
			const resUser: User = {
				id: user.userId,
				username: user.name,
				email: user.email,
				role: user.address,
				passwordHash: user.password,
				sex: String(user.sex),
				birthday: user.birthday,
				address: user.address,
			};
			return resUser;
		},
		getUsers: async (_, __, { dbconnection }) => {
			const userDao = new UserDao(dbconnection);
			const users = await userDao.getUserList();
			const resUsers: User[] = users.map((user) => {
				return {
					id: user.userId,
					username: user.name,
					email: user.email,
					role: user.address,
				};
			});
			return resUsers;
		},
		getRole: async (_, { id }, { dbconnection }) => {
			const roleDao = new RoleDao(dbconnection);
			const role = await roleDao.getRoleDetail(id);
			const resRole: Role = {
				id: role.roleId,
				name: role.roleName,
				permissions: [],
			};
			return resRole;
		},
		getRoles: async (_, __, { dbconnection }) => {
			const roleDao = new RoleDao(dbconnection);
			const role = await roleDao.getRoleList();
			const resRoles: Role[] = role.map((role) => {
				return {
					id: role.roleId,
					name: role.roleName,
					permissions: [],
				};
			});
			return resRoles;
		},
		getNoteById: async (_, { id }, { dbconnection }) => {
			const noteDao = new NoteDao(dbconnection);
			const note = await noteDao.getNoteDetail(id);
			const posttag: PostTag[] = note.tags.split(',').map((tag) => {
				return { name: tag };
			});
			const resNote: Note = {
				id: note.noteId,
				title: note.title,
				content: note.content,
				tags: posttag,
			};
			return resNote;
		},
		getNotes: async (_, __, { userId, dbconnection }) => {
			console.log(userId);
			const noteDao = new NoteDao(dbconnection);
			const note = await noteDao.getNoteList(userId);
			const resNotes: Note[] = note.map((note) => {
				const posttag: PostTag[] = note.tags.split(',').map((tag) => {
					return { name: tag };
				});
				return {
					id: note.noteId,
					title: note.title,
					content: note.content,
					tags: posttag,
				};
			});
			return resNotes;
		},
	},
	Mutation: {
		createUser: async (_, { username, email, role, birthday, sex, passwordHash, address }, { dbconnection }) => {
			const userId = generateUlid();
			const userDao = new UserDao(dbconnection);
			await userDao.createUser({
				userId: userId,
				name: username,
				sex: Number(sex),
				birthday: birthday,
				password: passwordHash,
				email: email,
				address: address,
			});
			const createdUser = await userDao.getUserDetail(userId);
			const res: User = {
				id: createdUser.userId,
				username: createdUser.name,
				email: createdUser.email,
				role: createdUser.address,
				birthday: createdUser.birthday,
				sex: String(createdUser.sex),
				passwordHash: createdUser.password,
				address: createdUser.address,
			};
			return res;
		},
		createRole: async (_, { name, permissions }, { dbconnection }) => {
			const roleId = generateUlid();
			const roleDao = new RoleDao(dbconnection);
			await roleDao.createRole({
				roleName: name,
			});
			const createdRole = await roleDao.getRoleDetail(roleId);
			const res: Role = {
				id: createdRole.roleId,
				name: createdRole.roleName,
				permissions: [],
			};
			return res;
		},
		createNote: async (_, { title, content, tags }, { userId, dbconnection }) => {
			const noteDao = new NoteDao(dbconnection);
			const tag = tags.join(',');
			const noteId = await noteDao.createNote({
				title: title,
				tags: tag,
				content: content,
				userId: userId,
			});
			const createdNote = await noteDao.getNoteDetail(noteId);
			const posttag: PostTag[] = createdNote.tags.split(',').map((tag) => {
				return { name: tag };
			});
			const res: Note = {
				id: createdNote.noteId,
				title: createdNote.title,
				content: createdNote.content,
				tags: posttag,
			};
			return res;
		},

		updateUser: async (_, { id, username, email, role, birthday, sex, passwordHash, address }, { dbconnection }) => {
			const userDao = new UserDao(dbconnection);
			await userDao.updateUser({
				userId: id,
				name: username,
				email: email,
				address: address,
				sex: Number(sex),
				birthday: birthday,
				password: passwordHash,
			});
			const updatedUser = await userDao.getUserDetail(id);
			const res: User = {
				id: updatedUser.userId,
				username: updatedUser.name,
				email: updatedUser.email,
				role: updatedUser.roleId,
				birthday: updatedUser.birthday,
				sex: String(updatedUser.sex),
				passwordHash: updatedUser.password,
				address: updatedUser.address,
			};
			return res;
		},
		updateRole: async (_, { id, name, permissions }, { dbconnection }) => {
			const roleDao = new RoleDao(dbconnection);
			await roleDao.updateRole({
				roleId: id,
				roleName: name,
			});
			const updatedRole = await roleDao.getRoleDetail(id);
			const res: Role = {
				id: updatedRole.roleId,
				name: updatedRole.roleName,
				permissions: [],
			};
			return res;
		},
		updateNote: async (_, { id, title, content, tags }, { dbconnection }) => {
			const noteDao = new NoteDao(dbconnection);
			await noteDao.updateNote({
				noteId: id,
				title: title,
				tags: tags.join(','),
				content: content,
			});
			const updatedNote = await noteDao.getNoteDetail(id);
			const posttag: PostTag[] = updatedNote.tags.split(',').map((tag) => {
				return { name: tag };
			});
			const res: Note = {
				id: updatedNote.noteId,
				title: updatedNote.title,
				content: updatedNote.content,
				tags: posttag,
			};
			return res;
		},

		deleteUser: async (_, { id }, { dbconnection }) => {
			const userDao = new UserDao(dbconnection);
			await userDao.deleteUser(id);
			const deletedUser = await userDao.getUserDetail(id);
			const res: User = {
				id: deletedUser.userId,
				username: deletedUser.name,
				email: deletedUser.email,
				role: deletedUser.address,
			};
			return res;
		},
		deleteRole: async (_, { id }, { dbconnection }) => {
			const roleDao = new RoleDao(dbconnection);
			await roleDao.deleteRole(id);
			const deletedRole = await roleDao.getRoleDetail(id);
			const res: Role = {
				id: deletedRole.roleId,
				name: deletedRole.roleName,
				permissions: [],
			};
			return res;
		},
		deleteNote: async (_, { id }, { dbconnection }) => {
			const noteDao = new NoteDao(dbconnection);
			await noteDao.deleteNote(id);
			const deletedNote = await noteDao.getNoteDetail(id);
			const posttag: PostTag[] = deletedNote.tags.split(',').map((tag) => {
				return { name: tag };
			});
			const res: Note = {
				id: deletedNote.noteId,
				title: deletedNote.title,
				content: deletedNote.content,
				tags: posttag,
			};
			return res;
		},

		login: async (_, { userId, email, password }, { dbconnection }) => {
			const userDao = new UserDao(dbconnection);
			let resuser: GetUserRow;

			if (!userId || userId !== '') {
				resuser = await userDao.getUserDetail(userId);
			} else {
				resuser = await userDao.getUserDetail(email);
			}

			const user: User = {
				id: resuser.userId,
				username: resuser.name,
				email: resuser.email,
				role: resuser.roleId,
			};
			const authUser = await authenticateUser(userId, email, password, user);
			const token = jwt.sign({ id: authUser.id }, 'your_secret_key', {
				expiresIn: 3600,
				algorithm: 'HS256',
			});
			const res: AuthPayload = {
				token: token,
				user: {
					id: authUser.id,
					username: authUser.username,
					email: authUser.email,
					role: authUser.role,
				},
			};
			return res;
		},
		logout: async (_, __, {}) => {
			return true;
		},
	},
};

async function authenticateUser(
	userId: string,
	email: string,
	password: string,
	user: User
): Promise<{ id: string; username: string; email: string; role: string }> {
	return new Promise((resolve, reject) => {
		if (userId === '' || email === '' || password === '') {
			reject('Invalid email or password');
		}

		if (userId && user.id !== userId) {
			reject('Invalid email or password');
		}

		if (email && user.email !== email) {
			reject('Invalid email or password');
		}

		// if (user.passwordHash !== password) {
		// 	reject('Invalid email or password');
		// }
		resolve({ id: user.id, username: user.username, email: user.email, role: user.role });
	});
}
