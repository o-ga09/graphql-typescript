## Typescript で GraphQL を使用したブログアプリ

[![Lint and Test](https://github.com/o-ga09/graphql-typescript/actions/workflows/lint_and_test.yml/badge.svg)](https://github.com/o-ga09/graphql-typescript/actions/workflows/lint_and_test.yml)[![Deploy](https://github.com/o-ga09/graphql-typescript/actions/workflows/deploy.yml/badge.svg)](https://github.com/o-ga09/graphql-typescript/actions/workflows/deploy.yml)

> [!NOTE]
> 本プロジェクトできること:
>
> - ユーザーの取得、作成、更新、削除
> - ノートの取得、作成、更新、削除

## Requirement

```bash
# node version
$ node -v
v20.12.0

# typescript version
5.5.3

# types/node version
20.12.0
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

## GitHub と Google Cloud の OIDC 認証

```bash
# サービスアカウントの作成
gcloud iam service-accounts create github-actions-sa \
  --display-name="GitHub Actions Service Account"

# サービスアカウントに必要なロールを付与
gcloud projects add-iam-policy-binding <PROJECT_ID> \
  --member="serviceAccount:githubactions@<PROJECT_ID>.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding <PROJECT_ID> \
  --member="serviceAccount:githubactions@<PROJECT_ID>.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# Workload Identity Poolの作成
gcloud iam workload-identity-pools create "github-actions-pool" \
  --project="<PROJECT_ID>" \
  --location="global" \
  --display-name="GitHub Actions Pool"

# Workload Identity Providerの作成
gcloud iam workload-identity-pools providers create-oidc "github-actions-provider" \
  --project="<PROJECT_ID>" \
  --location="global" \
  --workload-identity-pool="github-actions-pool" \
  --display-name="GitHub Actions Provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --attribute-condition="assertion.repository=='<github owner>/<github repo>'" \
  --issuer-uri="https://token.actions.githubusercontent.com"

# サービスアカウントへのバインディング
gcloud iam service-accounts add-iam-policy-binding "githubactions@<PROJECT_ID>.iam.gserviceaccount.com" \
  --project="<PROJECT_ID>" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/<PROJECT_ID>/locations/global/workloadIdentityPools/github-actions-pool/attribute.repository/<github owner>/<github repo>"

# GitHub Actionsに必要なシークレットの設定

```

## Firebase Authetication を Firebase 以外のデプロイ先で使用する

1. Firebase コンソールにログイン: Firebase コンソールにログインします。
2. プロジェクトを選択: 使用しているプロジェクトを選択します。
3. Authentication 設定に移動: 左側のメニューから「Authentication」を選択する
4. 認証ドメインの追加: 「承認済みドメイン」セクションに移動し、Vercel で使用しているドメインを追加します。例えば、your-project.vercel.app のように追加します。
5. 設定の保存: ドメインを追加したら、設定を保存します。

## Vercel と Google Cloud の OIDC 認証

## 参考

https://cloud.google.com/iam/docs/workload-identity-federation-with-deployment-pipelines?hl=ja#gcloud

https://vercel.com/docs/security/secure-backend-access/oidc/gcp

LICENSE @o-ga09
