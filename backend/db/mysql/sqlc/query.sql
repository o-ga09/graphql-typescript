-- name: GetNote :one
SELECT notes.id, notes.note_id, title, tags, content, notes.created_at, notes.updated_at, users.user_id, users.name, users.displayname FROM notes
JOIN user_notes ON notes.note_id = user_notes.note_id
JOIN users ON users.user_id = user_notes.user_id
WHERE user_notes.note_id = ? AND notes.deleted_at IS NULL LIMIT 1;

-- name: GetNotes :many
SELECT notes.id, notes.note_id, title, tags, content, notes.created_at, notes.updated_at, users.user_id, users.name, users.displayname FROM notes
JOIN user_notes ON notes.note_id = user_notes.note_id
JOIN users ON users.user_id = user_notes.user_id
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
WHERE note_id = ? AND notes.deleted_at IS NULL;

-- name: DeleteNote :exec
UPDATE notes
SET deleted_at = NOW()
WHERE notes.note_id = ?;

-- name: CreateUser :exec
INSERT INTO users (
    user_id,
    name,
    displayname
) VALUES (?, ?, ?);

-- name: GetUser :one
SELECT 
    id,
    user_id,
    name,
    displayname,
    created_at,
    updated_at
FROM users
WHERE user_id = ? AND deleted_at IS NULL LIMIT 1;

-- name: GetUsers :many
SELECT 
    id,
    user_id,
    name,
    displayname,
    created_at,
    updated_at
FROM users
WHERE deleted_at IS NULL
ORDER BY created_at DESC;

-- name: UpdateUser :exec
UPDATE users
SET name = ?,
    displayname = ?
WHERE user_id = ? AND deleted_at IS NULL;

-- name: DeleteUser :exec
UPDATE users
SET deleted_at = NOW()
WHERE user_id = ?;

-- name: CreateUserNote :exec
INSERT INTO user_notes (
    user_id,
    note_id
) VALUES (?, ?);

-- name: DeleteUserNote :exec
DELETE FROM user_notes
WHERE user_id = ? AND note_id = ?;
