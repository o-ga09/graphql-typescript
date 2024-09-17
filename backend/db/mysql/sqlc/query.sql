-- name: GetNote :one
SELECT id, notes.note_id, title, tags, content, created_at, updated_at FROM notes
JOIN user_notes ON notes.note_id = user_notes.note_id
WHERE user_notes.note_id = ? AND notes.deleted_at IS NULL LIMIT 1;

-- name: GetNotes :many
SELECT id, notes.note_id, title, tags, content, created_at, updated_at FROM notes
JOIN user_notes ON notes.note_id = user_notes.note_id
WHERE user_notes.user_id = ? AND notes.deleted_at IS NULL
ORDER BY created_at DESC;

-- name: CreateNote :exec
INSERT INTO notes (
    note_id,
    title,
    tags,
    content
) VALUES (?, ?, ?, ?);

-- name: UpdateNote :exec
UPDATE notes
SET title = ?,
    tags = ?,
    content = ?
WHERE note_id = ?;

-- name: DeleteNote :exec
UPDATE notes
SET deleted_at = NOW()
WHERE note_id = ?;

-- name: CreateUser :exec
INSERT INTO users (
    user_id,
    name,
    email,
    address,
    sex,
    birthday,
    password
) VALUES (?, ?, ?, ?, ?, ?, ?);

-- name: GetUser :one
SELECT 
    id,
    user_id,
    name,
    email,
    address,
    password,
    sex,
    birthday,
    created_at,
    updated_at
FROM users
WHERE user_id = ? LIMIT 1;

-- name: GetUsers :many
SELECT 
    id,
    user_id,
    name,
    email,
    address,
    password,
    sex,
    birthday,
    created_at,
    updated_at
FROM users
ORDER BY created_at DESC;

-- name: UpdateUser :exec
UPDATE users
SET name = ?,
    email = ?,
    address = ?,
    sex = ?,
    birthday = ?,
    password = ?
WHERE user_id = ?;

-- name: DeleteUser :exec
DELETE FROM users
WHERE user_id = ?;

-- name: CreateUserNote :exec
INSERT INTO user_notes (
    user_id,
    note_id
) VALUES (?, ?);
