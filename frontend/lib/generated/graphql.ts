/* eslint-disable @typescript-eslint/no-explicit-any */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type Mutation = {
  __typename?: "Mutation";
  createNote?: Maybe<Note>;
  createUser?: Maybe<User>;
  deleteNote?: Maybe<Scalars["String"]["output"]>;
  deleteUser?: Maybe<Scalars["String"]["output"]>;
  updateNote?: Maybe<Note>;
  updateUser?: Maybe<User>;
};

export type MutationCreateNoteArgs = {
  content: Scalars["String"]["input"];
  tags: Array<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
};

export type MutationCreateUserArgs = {
  displayname: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type MutationDeleteNoteArgs = {
  noteId: Scalars["ID"]["input"];
};

export type MutationDeleteUserArgs = {
  userId: Scalars["ID"]["input"];
};

export type MutationUpdateNoteArgs = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  noteId: Scalars["ID"]["input"];
  tags?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationUpdateUserArgs = {
  displayname?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["ID"]["input"];
  username: Scalars["String"]["input"];
};

export type Note = {
  __typename?: "Note";
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  noteId: Scalars["ID"]["output"];
  tags: Array<PostTag>;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type NoteByAuthor = {
  __typename?: "NoteByAuthor";
  author: User;
  note: Note;
};

export type Notes = {
  __typename?: "Notes";
  author: User;
  count: Scalars["Int"]["output"];
  notes: Array<Note>;
};

export type PostTag = {
  __typename?: "PostTag";
  name: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  getNoteById?: Maybe<NoteByAuthor>;
  getNotes?: Maybe<Notes>;
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<Maybe<User>>>;
};

export type QueryGetNoteByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryGetNotesArgs = {
  userId: Scalars["ID"]["input"];
};

export type QueryGetUserArgs = {
  id: Scalars["ID"]["input"];
};

export type User = {
  __typename?: "User";
  displayname: Scalars["String"]["output"];
  userId: Scalars["ID"]["output"];
  username: Scalars["String"]["output"];
};
