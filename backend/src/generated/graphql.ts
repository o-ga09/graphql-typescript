import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
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
	tags: Array<Scalars['String']['input']>;
	title?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUpdateUserArgs = {
	displayname: Scalars['String']['input'];
	userId: Scalars['ID']['input'];
	username?: InputMaybe<Scalars['String']['input']>;
};

export type Note = {
	__typename?: 'Note';
	content: Scalars['String']['output'];
	createdAt: Scalars['String']['output'];
	noteId: Scalars['ID']['output'];
	tags: Array<PostTag>;
	title: Scalars['String']['output'];
	updatedAt: Scalars['String']['output'];
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
	getNoteById?: Maybe<NoteByAuthor>;
	getNotes?: Maybe<Notes>;
	getUser?: Maybe<User>;
	getUsers?: Maybe<Array<Maybe<User>>>;
};

export type QueryGetNoteByIdArgs = {
	id: Scalars['ID']['input'];
};

export type QueryGetNotesArgs = {
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
	resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
	| ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
	obj: T,
	context: TContext,
	info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
	ID: ResolverTypeWrapper<Scalars['ID']['output']>;
	Int: ResolverTypeWrapper<Scalars['Int']['output']>;
	Mutation: ResolverTypeWrapper<{}>;
	Note: ResolverTypeWrapper<Note>;
	NoteByAuthor: ResolverTypeWrapper<NoteByAuthor>;
	Notes: ResolverTypeWrapper<Notes>;
	PostTag: ResolverTypeWrapper<PostTag>;
	Query: ResolverTypeWrapper<{}>;
	String: ResolverTypeWrapper<Scalars['String']['output']>;
	User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
	Boolean: Scalars['Boolean']['output'];
	ID: Scalars['ID']['output'];
	Int: Scalars['Int']['output'];
	Mutation: {};
	Note: Note;
	NoteByAuthor: NoteByAuthor;
	Notes: Notes;
	PostTag: PostTag;
	Query: {};
	String: Scalars['String']['output'];
	User: User;
};

export type MutationResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
	createNote?: Resolver<
		Maybe<ResolversTypes['Note']>,
		ParentType,
		ContextType,
		RequireFields<MutationCreateNoteArgs, 'content' | 'tags' | 'title' | 'userId'>
	>;
	createUser?: Resolver<
		Maybe<ResolversTypes['User']>,
		ParentType,
		ContextType,
		RequireFields<MutationCreateUserArgs, 'displayname' | 'userId' | 'username'>
	>;
	deleteNote?: Resolver<
		Maybe<ResolversTypes['String']>,
		ParentType,
		ContextType,
		RequireFields<MutationDeleteNoteArgs, 'noteId'>
	>;
	deleteUser?: Resolver<
		Maybe<ResolversTypes['String']>,
		ParentType,
		ContextType,
		RequireFields<MutationDeleteUserArgs, 'userId'>
	>;
	updateNote?: Resolver<
		Maybe<ResolversTypes['Note']>,
		ParentType,
		ContextType,
		RequireFields<MutationUpdateNoteArgs, 'noteId' | 'tags'>
	>;
	updateUser?: Resolver<
		Maybe<ResolversTypes['User']>,
		ParentType,
		ContextType,
		RequireFields<MutationUpdateUserArgs, 'displayname' | 'userId'>
	>;
};

export type NoteResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Note'] = ResolversParentTypes['Note'],
> = {
	content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	noteId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	tags?: Resolver<Array<ResolversTypes['PostTag']>, ParentType, ContextType>;
	title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NoteByAuthorResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['NoteByAuthor'] = ResolversParentTypes['NoteByAuthor'],
> = {
	author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
	note?: Resolver<ResolversTypes['Note'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NotesResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Notes'] = ResolversParentTypes['Notes'],
> = {
	author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
	count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
	notes?: Resolver<Array<ResolversTypes['Note']>, ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostTagResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['PostTag'] = ResolversParentTypes['PostTag'],
> = {
	name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
	getNoteById?: Resolver<
		Maybe<ResolversTypes['NoteByAuthor']>,
		ParentType,
		ContextType,
		RequireFields<QueryGetNoteByIdArgs, 'id'>
	>;
	getNotes?: Resolver<
		Maybe<ResolversTypes['Notes']>,
		ParentType,
		ContextType,
		RequireFields<QueryGetNotesArgs, 'userId'>
	>;
	getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
	getUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
};

export type UserResolvers<
	ContextType = any,
	ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
	displayname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	__isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
	Mutation?: MutationResolvers<ContextType>;
	Note?: NoteResolvers<ContextType>;
	NoteByAuthor?: NoteByAuthorResolvers<ContextType>;
	Notes?: NotesResolvers<ContextType>;
	PostTag?: PostTagResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	User?: UserResolvers<ContextType>;
};
