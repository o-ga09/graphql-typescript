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
$ npx tsc --init
$ npm install @apollo/server@4.10.4 graphql@16.8.2 @graphql-tools/graphql-file-loader@8.0.1 @graphql-tools/l
oad@8.0.2 @graphql-tools/schema@10.0.4
$ npm install tsx
```

Set up hot reload 

Install nopdemon

```bash
$ npm install -D nodemon
```

See nodemon [config file](./nodemon.json)

Set up GraphQL Schema

See [schema.graphql](./schema.graphql)

Set up GraphQL Code

See [index.ts](src/index.ts)

Set up GraphQL Server Generator

```bash
$ npm install -D @graphql-codegen/cli 
$ npm install -D @graphql-codegen/typescript 
$ npm install -D @graphql-codegen/typescript-resolvers
```

Generate GraphQL Init

```bash
$ npx graphql-code-generator init
? What type of application are you building? Backend - API or server
? Where is your schema?: (path or url) schema.graphql
? Pick plugins: TypeScript (required by other typescript plugins), TypeScript Resolvers (strongly typed resolve functions), TypeScript GraphQL document 
nodes (embedded GraphQL document)
? Where to write the output: src/generated/graphql.ts
? Do you want to generate an introspection file? Yes
? How to name the config file? codegen.ts
? What script in package.json should run the codegen? codegen
Fetching latest versions of selected plugins...
```

Generate GraphQL Code

```bash
$ npm install
$ npm run codegen
```

See [generated code](./generated/types.ts)
this file is DO NOT EDIT

Run GraphQL Server

add package.json

```json
"dev": "nodemon --watch 'src/**/*.ts' --exec 'tsx' src/app.ts",
```

```bash
$ npm run dev
```

## Install Vitest

Install

```bash
$ npm install -D vitest
```

add package.json script

```json
"test": "vitest",
```

## Install Linter

Install

```bash
$ npm install -D eslint
```

See eslint [config file](./eslint.config.js)

add package.json script

```json
"lint": "eslint . -c eslint.config.js --report-unused-disable-directives --max-warnings 0",
```

## Install Code Formatter

Install prettier

```bash
$ npm install -D prettier
```

See [config file](./.prettierrc)

See [config file](./.prettierignore)

vscode setting

```json
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

add package.json script

```json
"format": "npx prettier . --check",
"format:fix": "npx prettier --write .",
```

LICENSE @o-ga09
