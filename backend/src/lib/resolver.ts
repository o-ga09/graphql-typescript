/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
import { AuthPayload, Note, PostTag, Resolvers, User } from '@/generated/graphql';
import fs from 'fs';
import { NoteDao } from './dao/note';
import { UserDao } from './dao/user';
import { generateUlid } from './generateID/generateid';
import jwt from 'jsonwebtoken';
import { GetUserByEmailRow, GetUserRow } from '@/generated/driver/query_sql';

export const typeDefs = fs.readFileSync('./schema.graphql', {
	encoding: 'utf8',
});

export const resolvers: Resolvers = {
	Query: {
		getUser: async (_, { id }, { dbconnection }) => {
			const userDao = new UserDao(dbconnection);
			const user = await userDao.getUserDetail(id);
			const resUser: User = {
				userId: user.userId,
				username: user.name,
				email: user.email,
				passwordHash: user.password,
				sex: String(user.sex),
				birthday: user.birthday,
				address: user.address,
				role: user.role,
			};
			return resUser;
		},
		getUsers: async (_, __, { dbconnection }) => {
			const userDao = new UserDao(dbconnection);
			const users = await userDao.getUserList();
			const resUsers: User[] = users.map((user) => {
				return {
					userId: user.userId,
					username: user.name,
					email: user.email,
					birthday: user.birthday,
					sex: String(user.sex),
					passwordHash: user.password,
					address: user.address,
					role: user.role,
				};
			});
			return resUsers;
		},
		getNoteById: async (_, { id }, { dbconnection }) => {
			const noteDao = new NoteDao(dbconnection);
			const note = await noteDao.getNoteDetail(id);
			const posttag: PostTag[] = note.tags.split(',').map((tag) => {
				return { name: tag };
			});
			const resNote: Note = {
				noteId: note.noteId,
				title: note.title,
				content: note.content,
				tags: posttag,
			};
			return resNote;
		},
		getNotes: async (_, __, { userId, dbconnection }) => {
			const noteDao = new NoteDao(dbconnection);
			const note = await noteDao.getNoteList(userId);
			const resNotes: Note[] = note.map((note) => {
				const posttag: PostTag[] = note.tags.split(',').map((tag) => {
					return { name: tag };
				});
				return {
					noteId: note.noteId,
					title: note.title,
					content: note.content,
					tags: posttag,
				};
			});
			return resNotes;
		},
		currentUser: async (_, __, { userId, dbconnection }) => {
			const userDao = new UserDao(dbconnection);
			const user = await userDao.getUserDetail(userId);

			if (!user) {
				throw new Error('User not found');
			}
			const resUser: User = {
				userId: user.userId,
				username: user.name,
				email: user.email,
				role: user.address,
				passwordHash: user.password,
				sex: user.sex.toString(),
				birthday: user.birthday,
				address: user.address,
			};
			return resUser;
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
				roleId: role,
			});
			const createdUser = await userDao.getUserDetail(userId);
			const res: User = {
				userId: createdUser.userId,
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
				noteId: createdNote.noteId,
				title: createdNote.title,
				content: createdNote.content,
				tags: posttag,
			};
			return res;
		},

		updateUser: async (
			_,
			{ userId, username, email, role, birthday, sex, passwordHash, address },
			{ dbconnection }
		) => {
			const userDao = new UserDao(dbconnection);
			const user = await userDao.getUserDetail(userId);
			await userDao.updateUser({
				userId: userId ? userId : user.userId,
				name: username ? username : user.name,
				email: email ? email : user.email,
				address: address ? address : user.address,
				sex: Number(sex) ? Number(sex) : user.sex,
				birthday: birthday ? birthday : user.birthday,
				password: passwordHash ? passwordHash : user.password,
				role: role ? role : user.role,
			});
			const updatedUser = await userDao.getUserDetail(userId);
			const res: User = {
				userId: updatedUser.userId,
				username: updatedUser.name,
				email: updatedUser.email,
				role: updatedUser.role,
				birthday: updatedUser.birthday,
				sex: String(updatedUser.sex),
				passwordHash: updatedUser.password,
				address: updatedUser.address,
			};
			return res;
		},
		updateNote: async (_, { noteId, title, content, tags }, { dbconnection }) => {
			const noteDao = new NoteDao(dbconnection);
			const note = await noteDao.getNoteDetail(noteId);
			await noteDao.updateNote({
				noteId: noteId ? noteId : note.noteId,
				title: title ? title : note.title,
				tags: tags.join(',') ? tags.join(',') : note.tags,
				content: content ? content : note.content,
			});
			const updatedNote = await noteDao.getNoteDetail(noteId);
			const posttag: PostTag[] = updatedNote.tags.split(',').map((tag) => {
				return { name: tag };
			});
			const res: Note = {
				noteId: updatedNote.noteId,
				title: updatedNote.title,
				content: updatedNote.content,
				tags: posttag,
			};
			return res;
		},

		deleteUser: async (_, { userId }, { dbconnection }) => {
			const userDao = new UserDao(dbconnection);
			await userDao.deleteUser(userId);
			const deletedUser = await userDao.getUserDetail(userId);
			const res: User = {
				userId: deletedUser.userId,
				username: deletedUser.name,
				email: deletedUser.email,
				role: deletedUser.address,
			};
			return res;
		},
		deleteNote: async (_, { noteId }, { dbconnection }) => {
			const noteDao = new NoteDao(dbconnection);
			await noteDao.deleteNote(noteId);
			const deletedNote = await noteDao.getNoteDetail(noteId);
			const posttag: PostTag[] = deletedNote.tags.split(',').map((tag) => {
				return { name: tag };
			});
			const res: Note = {
				noteId: deletedNote.noteId,
				title: deletedNote.title,
				content: deletedNote.content,
				tags: posttag,
			};
			return res;
		},

		login: async (_, { email, password }, { dbconnection }) => {
			const userDao = new UserDao(dbconnection);
			let resuser: GetUserByEmailRow | null = null;

			resuser = await userDao.getUserByEmail(email);
			if (!resuser) {
				throw new Error('Invalid email or password');
			}

			const user: User = {
				userId: resuser.userId,
				username: resuser.name,
				email: resuser.email,
				role: resuser.role,
			};
			const authUser = await authenticateUser(email, password, user);
			const token = jwt.sign({ id: authUser.id }, process.env.AUTH_KEY, {
				expiresIn: 3600,
				algorithm: 'HS256',
			});
			const res: AuthPayload = {
				token: token,
				user: {
					userId: authUser.id,
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
	email: string,
	password: string,
	user: User
): Promise<{ id: string; username: string; email: string; role: string }> {
	return new Promise((resolve, reject) => {
		if (email === '' || password === '') {
			reject('Invalid email or password');
		}

		if (email && user.email !== email) {
			reject('Invalid email or password');
		}

		// if (user.passwordHash !== password) {
		// 	reject('Invalid email or password');
		// }
		resolve({ id: user.userId, username: user.username, email: user.email, role: user.role });
	});
}
