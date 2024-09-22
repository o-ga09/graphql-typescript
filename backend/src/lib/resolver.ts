import { Resolvers } from '@/generated/graphql';
import fs from 'fs';

export const typeDefs = fs.readFileSync('./schema.graphql', {
	encoding: 'utf8',
});

export const resolvers: Resolvers = {
	Query: {
		// eslint-disable-next-line no-empty-pattern
		authors: async (_parent, {}, { noteDao }) => {
			const res = await noteDao.getNoteList('');
			return res.map((note) => {
				return {
					id: '',
					name: note.title,
					posts: [{ id: '', title: note.title, content: note.content, tags: [{ name: '' }] }],
				};
			});
		},
		authorById: async (_parent, { id }, { noteDao }) => {
			const res = await noteDao.getNoteList(id);
			return {
				id: '',
				name: res[0].title,
				posts: [{ id: '', title: res[0].title, content: res[0].content, tags: [{ name: '' }] }],
			};
		},
	},
	Mutation: {
		createNote: async (_parent, { title, tags, content, userId }, { noteDao }) => {
			const t = tags.join(',');
			await noteDao.createNote({
				title: title,
				tags: t,
				content: content,
				userId: userId,
			});
			return { id: '', title: title, tags: [{ name: '' }], content: content };
		},
		updateNote: async (_parent, { id, title, tags, content }, { noteDao }) => {
			const t = tags.join(',');
			await noteDao.updateNote({
				noteId: id,
				title: title,
				tags: t,
				content: content,
			});
			return { id: '', title: title, tags: [{ name: '' }], content: content };
		},
		deleteNote: async (_parent, { id }, { noteDao }) => {
			await noteDao.deleteNote(id);
			return { id: '', title: '', tags: [{ name: '' }], content: '' };
		},
		createAuthor: async (_parent, { name }, { noteDao }) => {
			await noteDao.createAuthor(name);
			return { id: '', name: name, posts: [{ id: '', title: '', content: '', tags: [{ name: '' }] }] };
		},
		updateAuthor: async (_parent, { id, name }, { noteDao }) => {
			await noteDao.updateAuthor(id, name);
			return { id: id, name: name, posts: [{ id: '', title: '', content: '', tags: [{ name: '' }] }] };
		},
		deleteAuthor: async (_parent, { id }, { noteDao }) => {
			await noteDao.deleteAuthor(id);
			return { id: '', name: '', posts: [{ id: '', title: '', content: '', tags: [{ name: '' }] }] };
		},
	},
};
