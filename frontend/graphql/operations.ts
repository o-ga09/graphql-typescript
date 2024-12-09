import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      userId
      username
      displayname
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $userId: String!
    $username: String!
    $displayname: String!
  ) {
    createUser(
      userId: $userId
      username: $username
      displayname: $displayname
    ) {
      userId
      username
      displayname
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $username: String!) {
    updateUser(userId: $userId, username: $username) {
      userId
      username
      displayname
    }
  }
`;

export const CREATE_NOTE = gql`
  mutation CreateNote(
    $userId: String!
    $title: String!
    $content: String!
    $tags: [String!]!
  ) {
    createNote(userId: $userId, title: $title, content: $content, tags: $tags) {
      noteId
      title
      content
      createdAt
      updatedAt
      tags {
        name
      }
    }
  }
`;

export const GET_NOTES = gql`
  query GetNotes($userId: ID!) {
    getNotes(userId: $userId) {
      count
      notes {
        noteId
        title
        content
        createdAt
        updatedAt
        tags {
          name
        }
      }
      author {
        userId
        username
        displayname
      }
    }
  }
`;

export const GET_NOTE_BY_ID = gql`
  query GetNoteById($id: ID!) {
    getNoteById(id: $id) {
      note {
        noteId
        title
        content
        createdAt
        updatedAt
        tags {
          name
        }
      }
      author {
        userId
        username
        displayname
      }
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation UpdateNote(
    $noteId: ID!
    $title: String
    $content: String
    $tags: [String!]
  ) {
    updateNote(noteId: $noteId, title: $title, content: $content, tags: $tags) {
      noteId
      title
      content
      createdAt
      updatedAt
      tags {
        name
      }
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($noteId: ID!) {
    deleteNote(noteId: $noteId)
  }
`;
