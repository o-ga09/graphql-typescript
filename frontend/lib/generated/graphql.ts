import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote?: Maybe<Note>;
  createUser?: Maybe<User>;
  deleteNote?: Maybe<Scalars['String']['output']>;
  deleteUser?: Maybe<Scalars['String']['output']>;
  updateNote?: Maybe<Note>;
  updateUser?: Maybe<User>;
};


export type MutationCreateNoteArgs = {
  content: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  displayname: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteNoteArgs = {
  noteId: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationUpdateNoteArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  noteId: Scalars['ID']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  displayname?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
  username: Scalars['String']['input'];
};

export type Note = {
  __typename?: 'Note';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  noteId: Scalars['ID']['output'];
  tags: Array<PostTag>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type NoteByAuthor = {
  __typename?: 'NoteByAuthor';
  author: User;
  note: Note;
};

export type Notes = {
  __typename?: 'Notes';
  author: User;
  count: Scalars['Int']['output'];
  notes: Array<Note>;
};

export type PostTag = {
  __typename?: 'PostTag';
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getNoteAll?: Maybe<Array<Maybe<Note>>>;
  getNoteById?: Maybe<NoteByAuthor>;
  getNotesByUserId?: Maybe<Notes>;
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<Maybe<User>>>;
};


export type QueryGetNoteByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetNotesByUserIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  displayname: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type CreateNoteMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type CreateNoteMutation = { __typename?: 'Mutation', createNote?: { __typename?: 'Note', noteId: string, title: string, content: string, createdAt: any, updatedAt: any, tags: Array<{ __typename?: 'PostTag', name: string }> } | null };

export type CreateUserMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  username: Scalars['String']['input'];
  displayname: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', userId: string, username: string, displayname: string } | null };

export type DeleteNoteMutationVariables = Exact<{
  noteId: Scalars['ID']['input'];
}>;


export type DeleteNoteMutation = { __typename?: 'Mutation', deleteNote?: string | null };

export type GetNotesAllQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotesAllQuery = { __typename?: 'Query', getNoteAll?: Array<{ __typename?: 'Note', noteId: string, title: string, content: string, createdAt: any, updatedAt: any, tags: Array<{ __typename?: 'PostTag', name: string }> } | null> | null };

export type GetNotesByUserIdQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetNotesByUserIdQuery = { __typename?: 'Query', getNotesByUserId?: { __typename?: 'Notes', count: number, notes: Array<{ __typename?: 'Note', noteId: string, title: string, content: string, createdAt: any, updatedAt: any, tags: Array<{ __typename?: 'PostTag', name: string }> }>, author: { __typename?: 'User', userId: string, username: string, displayname: string } } | null };

export type GetNoteByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetNoteByIdQuery = { __typename?: 'Query', getNoteById?: { __typename?: 'NoteByAuthor', note: { __typename?: 'Note', noteId: string, title: string, content: string, createdAt: any, updatedAt: any, tags: Array<{ __typename?: 'PostTag', name: string }> }, author: { __typename?: 'User', userId: string, username: string, displayname: string } } | null };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', userId: string, username: string, displayname: string } | null };

export type UpdateNoteMutationVariables = Exact<{
  noteId: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type UpdateNoteMutation = { __typename?: 'Mutation', updateNote?: { __typename?: 'Note', noteId: string, title: string, content: string, createdAt: any, updatedAt: any, tags: Array<{ __typename?: 'PostTag', name: string }> } | null };

export type UpdateUserMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  username: Scalars['String']['input'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', userId: string, username: string, displayname: string } | null };


export const CreateNoteDocument = gql`
    mutation CreateNote($userId: String!, $title: String!, $content: String!, $tags: [String!]!) {
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
export type CreateNoteMutationFn = Apollo.MutationFunction<CreateNoteMutation, CreateNoteMutationVariables>;

/**
 * __useCreateNoteMutation__
 *
 * To run a mutation, you first call `useCreateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNoteMutation, { data, loading, error }] = useCreateNoteMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useCreateNoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateNoteMutation, CreateNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNoteDocument, options);
      }
export type CreateNoteMutationHookResult = ReturnType<typeof useCreateNoteMutation>;
export type CreateNoteMutationResult = Apollo.MutationResult<CreateNoteMutation>;
export type CreateNoteMutationOptions = Apollo.BaseMutationOptions<CreateNoteMutation, CreateNoteMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($userId: String!, $username: String!, $displayname: String!) {
  createUser(userId: $userId, username: $username, displayname: $displayname) {
    userId
    username
    displayname
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      username: // value for 'username'
 *      displayname: // value for 'displayname'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteNoteDocument = gql`
    mutation DeleteNote($noteId: ID!) {
  deleteNote(noteId: $noteId)
}
    `;
export type DeleteNoteMutationFn = Apollo.MutationFunction<DeleteNoteMutation, DeleteNoteMutationVariables>;

/**
 * __useDeleteNoteMutation__
 *
 * To run a mutation, you first call `useDeleteNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNoteMutation, { data, loading, error }] = useDeleteNoteMutation({
 *   variables: {
 *      noteId: // value for 'noteId'
 *   },
 * });
 */
export function useDeleteNoteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNoteMutation, DeleteNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(DeleteNoteDocument, options);
      }
export type DeleteNoteMutationHookResult = ReturnType<typeof useDeleteNoteMutation>;
export type DeleteNoteMutationResult = Apollo.MutationResult<DeleteNoteMutation>;
export type DeleteNoteMutationOptions = Apollo.BaseMutationOptions<DeleteNoteMutation, DeleteNoteMutationVariables>;
export const GetNotesAllDocument = gql`
    query GetNotesAll {
  getNoteAll {
    noteId
    title
    content
    tags {
      name
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetNotesAllQuery__
 *
 * To run a query within a React component, call `useGetNotesAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotesAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotesAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNotesAllQuery(baseOptions?: Apollo.QueryHookOptions<GetNotesAllQuery, GetNotesAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotesAllQuery, GetNotesAllQueryVariables>(GetNotesAllDocument, options);
      }
export function useGetNotesAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotesAllQuery, GetNotesAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotesAllQuery, GetNotesAllQueryVariables>(GetNotesAllDocument, options);
        }
export function useGetNotesAllSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetNotesAllQuery, GetNotesAllQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNotesAllQuery, GetNotesAllQueryVariables>(GetNotesAllDocument, options);
        }
export type GetNotesAllQueryHookResult = ReturnType<typeof useGetNotesAllQuery>;
export type GetNotesAllLazyQueryHookResult = ReturnType<typeof useGetNotesAllLazyQuery>;
export type GetNotesAllSuspenseQueryHookResult = ReturnType<typeof useGetNotesAllSuspenseQuery>;
export type GetNotesAllQueryResult = Apollo.QueryResult<GetNotesAllQuery, GetNotesAllQueryVariables>;
export const GetNotesByUserIdDocument = gql`
    query GetNotesByUserId($userId: ID!) {
  getNotesByUserId(userId: $userId) {
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

/**
 * __useGetNotesByUserIdQuery__
 *
 * To run a query within a React component, call `useGetNotesByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotesByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotesByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetNotesByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetNotesByUserIdQuery, GetNotesByUserIdQueryVariables> & ({ variables: GetNotesByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotesByUserIdQuery, GetNotesByUserIdQueryVariables>(GetNotesByUserIdDocument, options);
      }
export function useGetNotesByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotesByUserIdQuery, GetNotesByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotesByUserIdQuery, GetNotesByUserIdQueryVariables>(GetNotesByUserIdDocument, options);
        }
export function useGetNotesByUserIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetNotesByUserIdQuery, GetNotesByUserIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNotesByUserIdQuery, GetNotesByUserIdQueryVariables>(GetNotesByUserIdDocument, options);
        }
export type GetNotesByUserIdQueryHookResult = ReturnType<typeof useGetNotesByUserIdQuery>;
export type GetNotesByUserIdLazyQueryHookResult = ReturnType<typeof useGetNotesByUserIdLazyQuery>;
export type GetNotesByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetNotesByUserIdSuspenseQuery>;
export type GetNotesByUserIdQueryResult = Apollo.QueryResult<GetNotesByUserIdQuery, GetNotesByUserIdQueryVariables>;
export const GetNoteByIdDocument = gql`
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

/**
 * __useGetNoteByIdQuery__
 *
 * To run a query within a React component, call `useGetNoteByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoteByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoteByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetNoteByIdQuery(baseOptions: Apollo.QueryHookOptions<GetNoteByIdQuery, GetNoteByIdQueryVariables> & ({ variables: GetNoteByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoteByIdQuery, GetNoteByIdQueryVariables>(GetNoteByIdDocument, options);
      }
export function useGetNoteByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoteByIdQuery, GetNoteByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoteByIdQuery, GetNoteByIdQueryVariables>(GetNoteByIdDocument, options);
        }
export function useGetNoteByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetNoteByIdQuery, GetNoteByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNoteByIdQuery, GetNoteByIdQueryVariables>(GetNoteByIdDocument, options);
        }
export type GetNoteByIdQueryHookResult = ReturnType<typeof useGetNoteByIdQuery>;
export type GetNoteByIdLazyQueryHookResult = ReturnType<typeof useGetNoteByIdLazyQuery>;
export type GetNoteByIdSuspenseQueryHookResult = ReturnType<typeof useGetNoteByIdSuspenseQuery>;
export type GetNoteByIdQueryResult = Apollo.QueryResult<GetNoteByIdQuery, GetNoteByIdQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: ID!) {
  getUser(id: $id) {
    userId
    username
    displayname
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const UpdateNoteDocument = gql`
    mutation UpdateNote($noteId: ID!, $title: String, $content: String, $tags: [String!]) {
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
export type UpdateNoteMutationFn = Apollo.MutationFunction<UpdateNoteMutation, UpdateNoteMutationVariables>;

/**
 * __useUpdateNoteMutation__
 *
 * To run a mutation, you first call `useUpdateNoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNoteMutation, { data, loading, error }] = useUpdateNoteMutation({
 *   variables: {
 *      noteId: // value for 'noteId'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useUpdateNoteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNoteMutation, UpdateNoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(UpdateNoteDocument, options);
      }
export type UpdateNoteMutationHookResult = ReturnType<typeof useUpdateNoteMutation>;
export type UpdateNoteMutationResult = Apollo.MutationResult<UpdateNoteMutation>;
export type UpdateNoteMutationOptions = Apollo.BaseMutationOptions<UpdateNoteMutation, UpdateNoteMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($userId: ID!, $username: String!) {
  updateUser(userId: $userId, username: $username) {
    userId
    username
    displayname
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;