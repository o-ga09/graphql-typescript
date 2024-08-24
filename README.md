## Typescript で GraphQL を使用したブログアプリ

## Requirement

```bash
# node version
$ node -v
v20.12.0

# typescript version
5.5.3

# types/node version
20.14.9
```

## Get Started !

Set up GraphQL Library

```bash
$ mkdir graphql-typescript
$ cd graphql-typescript
$ touch src/index.ts
$ npm init --yes && npm pkg set type="module"
$ npm install @apollo/server@4.10.4 graphql@16.8.2 @graphql-tools/graphql-file-loader@8.0.1 @graphql-tools/l
oad@8.0.2 @graphql-tools/schema@10.0.4
```

Set up GraphQL Schema

See [schema.graphql](./schema.graphql)

Set up GraphQL Code

See [index.ts](src/index.ts)

LICENCE @o-ga09
