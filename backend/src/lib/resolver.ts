/* eslint-disable @typescript-eslint/no-unused-vars */

import { Note, NoteByAuthor, Notes, PostTag, Resolvers, User } from '@/generated/graphql';
import fs from 'fs';
import { NoteDao } from './dao/note';
import { UserDao } from './dao/user';

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
				displayname: user.displayname,
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
					displayname: user.displayname,
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
			const resNote: NoteByAuthor = {
				note: {
					noteId: note.noteId,
					title: note.title,
					content: note.content,
					createdAt: note.createdAt.toISOString(),
					updatedAt: note.updatedAt.toISOString(),
					tags: posttag,
				},
				author: {
					userId: note.userId,
					username: note.name,
					displayname: note.displayname,
				},
			};
			return resNote;
		},
		getNotes: async (_, { userId }, { dbconnection }) => {
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
					createdAt: note.createdAt.toISOString(),
					updatedAt: note.updatedAt.toISOString(),
					tags: posttag,
				};
			});
			const res: Notes = {
				count: resNotes.length,
				notes: resNotes,
				author: {
					userId: note[0].userId,
					username: note[0].name,
					displayname: note[0].displayname,
				},
			};
			return res;
		},
	},
	Mutation: {
		createUser: async (_, { userId, username, displayname }, { dbconnection }) => {
			const userDao = new UserDao(dbconnection);
			await userDao.createUser({
				userId: userId,
				name: username,
				displayname: displayname,
			});
			const createdUser = await userDao.getUserDetail(userId);
			const resUser: User = {
				userId: createdUser.userId,
				username: createdUser.name,
				displayname: createdUser.displayname,
			};
			return resUser;
		},
		createNote: async (_, { userId, title, content, tags }, { dbconnection }) => {
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
			const resNote: Note = {
				noteId: createdNote.noteId,
				title: createdNote.title,
				content: createdNote.content,
				tags: posttag,
				createdAt: createdNote.createdAt.toISOString(),
				updatedAt: createdNote.updatedAt.toISOString(),
			};
			return resNote;
		},

		updateUser: async (_, { userId, username, displayname }, { dbconnection }) => {
			const userDao = new UserDao(dbconnection);
			const user = await userDao.getUserDetail(userId);
			await userDao.updateUser({
				userId: userId ? userId : user.userId,
				name: username ? username : user.name,
				displayname: displayname ? displayname : user.displayname,
			});
			const updatedUser = await userDao.getUserDetail(userId);
			const resUser: User = {
				userId: updatedUser.userId,
				username: updatedUser.name,
				displayname: updatedUser.displayname,
			};
			return resUser;
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
			const resNote: Note = {
				noteId: updatedNote.noteId,
				title: updatedNote.title,
				content: updatedNote.content,
				createdAt: updatedNote.createdAt.toISOString(),
				updatedAt: updatedNote.updatedAt.toISOString(),
				tags: posttag,
			};
			return resNote;
		},

		deleteUser: async (_, { userId }, { dbconnection }) => {
			try {
				const userDao = new UserDao(dbconnection);
				await userDao.deleteUser(userId);
				return '';
			} catch (e) {
				throw new Error('削除に失敗しました');
			}
		},
		deleteNote: async (_, { noteId }, { dbconnection }) => {
			try {
				const noteDao = new NoteDao(dbconnection);
				await noteDao.deleteNote(noteId);
				return '';
			} catch (e) {
				throw new Error('削除に失敗しました');
			}
		},
	},
};
