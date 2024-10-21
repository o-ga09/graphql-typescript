import mysql, { RowDataPacket } from "mysql2/promise";

type Client = mysql.Connection | mysql.Pool;

export const getNoteQuery = `-- name: GetNote :one
SELECT id, note_id, title, tags, content, created_at, updated_at FROM notes
WHERE note_id = ? AND deleted_at IS NULL LIMIT 1`;

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
        updatedAt: row[6]
    };
}

export const getNotesQuery = `-- name: GetNotes :many
SELECT id, notes.note_id, title, tags, content, notes.created_at, notes.updated_at FROM notes
JOIN user_notes ON notes.note_id = user_notes.note_id
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
            updatedAt: row[6]
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
WHERE note_id = ?`;

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
WHERE note_id = ?`;

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
    email,
    address,
    password,
    sex,
    birthday,
    role
) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

export interface CreateUserArgs {
    userId: string;
    name: string;
    email: string;
    address: string;
    password: string;
    sex: number;
    birthday: string;
    role: string;
}

export async function createUser(client: Client, args: CreateUserArgs): Promise<void> {
    await client.query({
        sql: createUserQuery,
        values: [args.userId, args.name, args.email, args.address, args.password, args.sex, args.birthday, args.role]
    });
}

export const getUserQuery = `-- name: GetUser :one
SELECT 
    id,
    user_id,
    name,
    email,
    address,
    password,
    sex,
    birthday,
    role,
    created_at,
    updated_at
FROM users
WHERE user_id = ? LIMIT 1`;

export interface GetUserArgs {
    userId: string;
}

export interface GetUserRow {
    id: number;
    userId: string;
    name: string;
    email: string;
    address: string;
    password: string;
    sex: number;
    birthday: string;
    role: string;
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
        email: row[3],
        address: row[4],
        password: row[5],
        sex: row[6],
        birthday: row[7],
        role: row[8],
        createdAt: row[9],
        updatedAt: row[10]
    };
}

export const getUserByEmailQuery = `-- name: GetUserByEmail :one
SELECT 
    user_id,
    name,
    email,
    role
FROM users
WHERE email = ? LIMIT 1`;

export interface GetUserByEmailArgs {
    email: string;
}

export interface GetUserByEmailRow {
    userId: string;
    name: string;
    email: string;
    role: string;
}

export async function getUserByEmail(client: Client, args: GetUserByEmailArgs): Promise<GetUserByEmailRow | null> {
    const [rows] = await client.query<RowDataPacket[]>({
        sql: getUserByEmailQuery,
        values: [args.email],
        rowsAsArray: true
    });
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        userId: row[0],
        name: row[1],
        email: row[2],
        role: row[3]
    };
}

export const getUsersQuery = `-- name: GetUsers :many
SELECT 
    id,
    user_id,
    name,
    email,
    address,
    password,
    sex,
    birthday,
    role,
    created_at,
    updated_at
FROM users
ORDER BY created_at DESC`;

export interface GetUsersRow {
    id: number;
    userId: string;
    name: string;
    email: string;
    address: string;
    password: string;
    sex: number;
    birthday: string;
    role: string;
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
            email: row[3],
            address: row[4],
            password: row[5],
            sex: row[6],
            birthday: row[7],
            role: row[8],
            createdAt: row[9],
            updatedAt: row[10]
        };
    });
}

export const updateUserQuery = `-- name: UpdateUser :exec
UPDATE users
SET name = ?,
    email = ?,
    address = ?,
    sex = ?,
    birthday = ?,
    password = ?,
    role = ?
WHERE user_id = ?`;

export interface UpdateUserArgs {
    name: string;
    email: string;
    address: string;
    sex: number;
    birthday: string;
    password: string;
    role: string;
    userId: string;
}

export async function updateUser(client: Client, args: UpdateUserArgs): Promise<void> {
    await client.query({
        sql: updateUserQuery,
        values: [args.name, args.email, args.address, args.sex, args.birthday, args.password, args.role, args.userId]
    });
}

export const deleteUserQuery = `-- name: DeleteUser :exec
DELETE FROM users
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

