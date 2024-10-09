/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
import { AuthPayload, Note, PostTag, Resolvers, User } from '@/generated/graphql';
import fs from 'fs';
import { NoteDao } from './dao/note';
import { UserDao } from './dao/user';
import { generateUlid } from './generateID/generateid';
import jwt from 'jsonwebtoken';

export const typeDefs = fs.readFileSync('./schema.graphql', {
	encoding: 'utf8',
});

export const resolvers: Resolvers = {
	Query: {
		getUser: async (_, { id }, { dataSources }) => {
			return dataSources.userAPI.getUser(id);
		},
		getUsers: async (_, __, { dataSources }) => {
			return dataSources.userAPI.getUsers();
		},
		getRole: async (_, { id }, { dataSources }) => {
			return dataSources.roleAPI.getRole(id);
		},
		getRoles: async (_, __, { dataSources }) => {
			return dataSources.roleAPI.getRoles();
		},
		getNoteById: async (_, { id }, { dataSources }) => {
			return dataSources.noteAPI.getNoteById(id);
		},
		getNotes: async (_, __, { dataSources }) => {
			return dataSources.noteAPI.getNotes();
		},
	},
	Mutation: {
		createUser: async (_, { username, email, role }, dataSources: UserDao) => {
			const userId = generateUlid();
			await dataSources.createUser({
				userId: userId,
				name: username,
				sex: 1,
				birthday: '',
				password: '',
				email: email,
				address: role,
			});
			const createdUser = await dataSources.getUserDetail(userId);
			const res: User = {
				id: createdUser.userId,
				username: createdUser.name,
				email: createdUser.email,
				role: createdUser.address,
			};
			return res;
		},
		createRole: async (_, { name, permissions }, { dataSources }) => {
			return dataSources.roleAPI.createRole(input);
		},
		createNote: async (_, { title, content, tags }, dataSources: NoteDao) => {
			const tag = tags.join(',');
			const noteId = await dataSources.createNote({
				title: title,
				tags: tag,
				content: content,
				userId: '1',
			});
			const createdNote = await dataSources.getNoteDetail(noteId);
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

		updateUser: async (_, { id, username, email, role }, dataSources: UserDao) => {
			await dataSources.updateUser({
				userId: id,
				name: username,
				email: email,
				address: role,
				sex: 1,
				birthday: '',
				password: '',
			});
			const updatedUser = await dataSources.getUserDetail(id);
			const res: User = {
				id: updatedUser.userId,
				username: updatedUser.name,
				email: updatedUser.email,
				role: updatedUser.address,
			};
			return res;
		},
		updateRole: async (_, { id, name, permissions }, { dataSources }) => {
			return dataSources.roleAPI.updateRole(id, input);
		},
		updateNote: async (_, { id, title, content, tags }, dataSources: NoteDao) => {
			await dataSources.updateNote({
				noteId: id,
				title: title,
				tags: tags.join(','),
				content: content,
			});
			const updatedNote = await dataSources.getNoteDetail(id);
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

		deleteUser: async (_, { id }, dataSources: UserDao) => {
			await dataSources.deleteUser(id);
			const deletedUser = await dataSources.getUserDetail(id);
			const res: User = {
				id: deletedUser.userId,
				username: deletedUser.name,
				email: deletedUser.email,
				role: deletedUser.address,
			};
			return res;
		},
		deleteRole: async (_, { id }, { dataSources }) => {
			return dataSources.roleAPI.deleteRole(id);
		},
		deleteNote: async (_, { id }, dataSources: NoteDao) => {
			await dataSources.deleteNote(id);
			const deletedNote = await dataSources.getNoteDetail(id);
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

		login: async (_, { email, password }, {}) => {
			const user = await authenticateUser(email, password);
			const token = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });
			const res: AuthPayload = {
				token: token,
				user: {
					id: user.id,
					username: user.username,
					email: '',
					role: '',
				},
			};
			return res;
		},
		logout: async (_, __, {}) => {
			return true;
		},
	},
};

function authenticateUser(email: string, password: string): Promise<{ id: string; username: string }> {
	return new Promise((resolve, reject) => {
		if (email === '' || password === '') {
			reject('Invalid email or password');
		}
		resolve({ id: '1', username: 'admin' });
	});
}
