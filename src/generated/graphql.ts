import { GraphQLResolveInfo } from "graphql";
import gql from "graphql-tag";
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
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Author = User & {
  __typename?: "Author";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  posts: Array<Note>;
};

export type Note = {
  __typename?: "Note";
  content: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  tags: Array<PostTag>;
  title: Scalars["String"]["output"];
};

export type Nutation = {
  __typename?: "Nutation";
  createAuthor?: Maybe<Author>;
  createNote?: Maybe<Note>;
  deleteAuthor?: Maybe<Author>;
  deleteNote?: Maybe<Note>;
  updateAuthor?: Maybe<Author>;
  updateNote?: Maybe<Note>;
};

export type NutationCreateAuthorArgs = {
  name: Scalars["String"]["input"];
};

export type NutationCreateNoteArgs = {
  content: Scalars["String"]["input"];
  tags: Array<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
};

export type NutationDeleteAuthorArgs = {
  id: Scalars["ID"]["input"];
};

export type NutationDeleteNoteArgs = {
  id: Scalars["ID"]["input"];
};

export type NutationUpdateAuthorArgs = {
  id: Scalars["ID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type NutationUpdateNoteArgs = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  tags?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type PostTag = {
  __typename?: "PostTag";
  name: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  authorById?: Maybe<Author>;
  authors: Array<Author>;
};

export type QueryAuthorByIdArgs = {
  id: Scalars["ID"]["input"];
};

export type User = {
  name: Scalars["String"]["output"];
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
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> =
  {
    User: Author;
  };

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Author: ResolverTypeWrapper<Author>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Note: ResolverTypeWrapper<Note>;
  Nutation: ResolverTypeWrapper<Nutation>;
  PostTag: ResolverTypeWrapper<PostTag>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  User: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>["User"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Author: Author;
  Boolean: Scalars["Boolean"]["output"];
  ID: Scalars["ID"]["output"];
  Note: Note;
  Nutation: Nutation;
  PostTag: PostTag;
  Query: {};
  String: Scalars["String"]["output"];
  User: ResolversInterfaceTypes<ResolversParentTypes>["User"];
};

export type AuthorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Author"] = ResolversParentTypes["Author"],
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes["Note"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NoteResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Note"] = ResolversParentTypes["Note"],
> = {
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes["PostTag"]>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Nutation"] = ResolversParentTypes["Nutation"],
> = {
  createAuthor?: Resolver<
    Maybe<ResolversTypes["Author"]>,
    ParentType,
    ContextType,
    RequireFields<NutationCreateAuthorArgs, "name">
  >;
  createNote?: Resolver<
    Maybe<ResolversTypes["Note"]>,
    ParentType,
    ContextType,
    RequireFields<NutationCreateNoteArgs, "content" | "tags" | "title">
  >;
  deleteAuthor?: Resolver<
    Maybe<ResolversTypes["Author"]>,
    ParentType,
    ContextType,
    RequireFields<NutationDeleteAuthorArgs, "id">
  >;
  deleteNote?: Resolver<
    Maybe<ResolversTypes["Note"]>,
    ParentType,
    ContextType,
    RequireFields<NutationDeleteNoteArgs, "id">
  >;
  updateAuthor?: Resolver<
    Maybe<ResolversTypes["Author"]>,
    ParentType,
    ContextType,
    RequireFields<NutationUpdateAuthorArgs, "id">
  >;
  updateNote?: Resolver<
    Maybe<ResolversTypes["Note"]>,
    ParentType,
    ContextType,
    RequireFields<NutationUpdateNoteArgs, "id">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostTagResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["PostTag"] = ResolversParentTypes["PostTag"],
> = {
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  authorById?: Resolver<
    Maybe<ResolversTypes["Author"]>,
    ParentType,
    ContextType,
    RequireFields<QueryAuthorByIdArgs, "id">
  >;
  authors?: Resolver<Array<ResolversTypes["Author"]>, ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = {
  __resolveType: TypeResolveFn<"Author", ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Author?: AuthorResolvers<ContextType>;
  Note?: NoteResolvers<ContextType>;
  Nutation?: NutationResolvers<ContextType>;
  PostTag?: PostTagResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};
