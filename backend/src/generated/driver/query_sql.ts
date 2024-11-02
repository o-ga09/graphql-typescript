import mysql, { RowDataPacket } from "mysql2/promise";

type Client = mysql.Connection | mysql.Pool;

export const getNoteQuery = `-- name: GetNote :one
SELECT notes.id, notes.note_id, title, tags, content, notes.created_at, notes.updated_at, users.user_id, users.name, users.displayname FROM notes
JOIN user_notes ON notes.note_id = user_notes.note_id
JOIN users ON users.user_id = user_notes.user_id
WHERE user_notes.note_id = ? AND notes.deleted_at IS NULL LIMIT 1`;

export interface GetNoteArgs {
    noteId: string;
}

export interface GetNoteRow {
    id: number;
    noteId: string;
    title: string;
    tags: string;
    content: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string;
    name: string;
    displayname: string;
}

export async function getNote(client: Client, args: GetNoteArgs): Promise<GetNoteRow | null> {
    const [rows] = await client.query<RowDataPacket[]>({
        sql: getNoteQuery,
        values: [args.noteId],
        rowsAsArray: true
    });
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        noteId: row[1],
        title: row[2],
        tags: row[3],
        content: row[4],
        createdAt: row[5],
        updatedAt: row[6],
        userId: row[7],
        name: row[8],
        displayname: row[9]
    };
}

export const getNotesQuery = `-- name: GetNotes :many
SELECT notes.id, notes.note_id, title, tags, content, notes.created_at, notes.updated_at, users.user_id, users.name, users.displayname FROM notes
JOIN user_notes ON notes.note_id = user_notes.note_id
JOIN users ON users.user_id = user_notes.user_id
WHERE user_notes.user_id = ? AND notes.deleted_at IS NULL
ORDER BY created_at DESC`;

export interface GetNotesArgs {
    userId: string;
}

export interface GetNotesRow {
    id: number;
    noteId: string;
    title: string;
    tags: string;
    content: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string;
    name: string;
    displayname: string;
}

export async function getNotes(client: Client, args: GetNotesArgs): Promise<GetNotesRow[]> {
    const [rows] = await client.query<RowDataPacket[]>({
        sql: getNotesQuery,
        values: [args.userId],
        rowsAsArray: true
    });
    return rows.map(row => {
        return {
            id: row[0],
            noteId: row[1],
            title: row[2],
            tags: row[3],
            content: row[4],
            createdAt: row[5],
            updatedAt: row[6],
            userId: row[7],
            name: row[8],
            displayname: row[9]
        };
    });
}

export const createNoteQuery = `-- name: CreateNote :exec
INSERT INTO notes (
    note_id,
    title,
    tags,
    content
) VALUES (?, ?, ?, ?)`;

export interface CreateNoteArgs {
    noteId: string;
    title: string;
    tags: string;
    content: string;
}

export async function createNote(client: Client, args: CreateNoteArgs): Promise<void> {
    await client.query({
        sql: createNoteQuery,
        values: [args.noteId, args.title, args.tags, args.content]
    });
}

export const updateNoteQuery = `-- name: UpdateNote :exec
UPDATE notes
SET title = ?,
    tags = ?,
    content = ?
WHERE note_id = ? AND notes.deleted_at IS NULL`;

export interface UpdateNoteArgs {
    title: string;
    tags: string;
    content: string;
    noteId: string;
}

export async function updateNote(client: Client, args: UpdateNoteArgs): Promise<void> {
    await client.query({
        sql: updateNoteQuery,
        values: [args.title, args.tags, args.content, args.noteId]
    });
}

export const deleteNoteQuery = `-- name: DeleteNote :exec
UPDATE notes
SET deleted_at = NOW()
WHERE notes.note_id = ?`;

export interface DeleteNoteArgs {
    noteId: string;
}

export async function deleteNote(client: Client, args: DeleteNoteArgs): Promise<void> {
    await client.query({
        sql: deleteNoteQuery,
        values: [args.noteId]
    });
}

export const createUserQuery = `-- name: CreateUser :exec
INSERT INTO users (
    user_id,
    name,
    displayname
) VALUES (?, ?, ?)`;

export interface CreateUserArgs {
    userId: string;
    name: string;
    displayname: string;
}

export async function createUser(client: Client, args: CreateUserArgs): Promise<void> {
    await client.query({
        sql: createUserQuery,
        values: [args.userId, args.name, args.displayname]
    });
}

export const getUserQuery = `-- name: GetUser :one
SELECT 
    id,
    user_id,
    name,
    displayname,
    created_at,
    updated_at
FROM users
WHERE user_id = ? AND deleted_at IS NULL LIMIT 1`;

export interface GetUserArgs {
    userId: string;
}

export interface GetUserRow {
    id: number;
    userId: string;
    name: string;
    displayname: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function getUser(client: Client, args: GetUserArgs): Promise<GetUserRow | null> {
    const [rows] = await client.query<RowDataPacket[]>({
        sql: getUserQuery,
        values: [args.userId],
        rowsAsArray: true
    });
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        userId: row[1],
        name: row[2],
        displayname: row[3],
        createdAt: row[4],
        updatedAt: row[5]
    };
}

export const getUsersQuery = `-- name: GetUsers :many
SELECT 
    id,
    user_id,
    name,
    displayname,
    created_at,
    updated_at
FROM users
WHERE deleted_at IS NULL
ORDER BY created_at DESC`;

export interface GetUsersRow {
    id: number;
    userId: string;
    name: string;
    displayname: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export async function getUsers(client: Client): Promise<GetUsersRow[]> {
    const [rows] = await client.query<RowDataPacket[]>({
        sql: getUsersQuery,
        values: [],
        rowsAsArray: true
    });
    return rows.map(row => {
        return {
            id: row[0],
            userId: row[1],
            name: row[2],
            displayname: row[3],
            createdAt: row[4],
            updatedAt: row[5]
        };
    });
}

export const updateUserQuery = `-- name: UpdateUser :exec
UPDATE users
SET name = ?,
    displayname = ?
WHERE user_id = ? AND deleted_at IS NULL`;

export interface UpdateUserArgs {
    name: string;
    displayname: string;
    userId: string;
}

export async function updateUser(client: Client, args: UpdateUserArgs): Promise<void> {
    await client.query({
        sql: updateUserQuery,
        values: [args.name, args.displayname, args.userId]
    });
}

export const deleteUserQuery = `-- name: DeleteUser :exec
UPDATE users
SET deleted_at = NOW()
WHERE user_id = ?`;

export interface DeleteUserArgs {
    userId: string;
}

export async function deleteUser(client: Client, args: DeleteUserArgs): Promise<void> {
    await client.query({
        sql: deleteUserQuery,
        values: [args.userId]
    });
}

export const createUserNoteQuery = `-- name: CreateUserNote :exec
INSERT INTO user_notes (
    user_id,
    note_id
) VALUES (?, ?)`;

export interface CreateUserNoteArgs {
    userId: string;
    noteId: string;
}

export async function createUserNote(client: Client, args: CreateUserNoteArgs): Promise<void> {
    await client.query({
        sql: createUserNoteQuery,
        values: [args.userId, args.noteId]
    });
}

export const deleteUserNoteQuery = `-- name: DeleteUserNote :exec
DELETE FROM user_notes
WHERE user_id = ? AND note_id = ?`;

export interface DeleteUserNoteArgs {
    userId: string;
    noteId: string;
}

export async function deleteUserNote(client: Client, args: DeleteUserNoteArgs): Promise<void> {
    await client.query({
        sql: deleteUserNoteQuery,
        values: [args.userId, args.noteId]
    });
}

