# Getting started

## Websites

### OnePassword

Setting up the 1Password extension is useful to get the password for many of the tools used to manage our app (Heroku, Hasura for example).

You should receive an invite to the organization, after which you'll be able to set up your account.

### Heroku

Heroku is used to deploy our backend and to manage environment variables.

Credentials can be found in 1Password.

### Vercel

Vercel is used to deploy the frontend and manage its environment variables.

It has many interesting features such as review apps and one-click rollbacks.

Credentials can be found in 1Password.

## Command-line tools

### yarn

```
npm install --global yarn
```

### Rust

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Heroku

With Homebrew:

```
brew tap heroku/brew && brew install heroku
```

### Hasura

With Home

## Desktop apps

### Docker

Install Docker Desktop [here](https://desktop.docker.com/mac/main/amd64/Docker.dmg).

### TablePlus

TablePlus is a tool used to inspect, edit, backup... relational databases.

Download Table Plus [here](https://tableplus.com/release/osx/tableplus_latest)

### Figma

Figma is a tool to create and share wireframes and component design.

Download Figma [here](https://www.figma.com/download/desktop/mac)

### Linear

Linear is the tool used for product management.

Download Linear [here](https://desktop.linear.app/mac)

## Browser extensions

### Testing playground

Testing Playground is a Chrome extension designed to be able to easily find selectors for DOM elements.

Is is useful when writing tests and can be downloaded [here](https://chrome.google.com/webstore/detail/testing-playground)

### Apollo Client Devtools

The Apollo Client Devtools are useful to see what is the current state of the Apollo Client cache, queries, etc ...

They can be downloaded [here](https://chrome.google.com/webstore/detail/apollo-client-devtools)

### React dev tools

The React Developer tools are used to profile component reloads and invesitgate performance issues.

They can be downloaded [here](https://chrome.google.com/webstore/detail/react-developer-tools)

## Development setup

The services should ideally be started in the order of the following sections.

### Environment variables

Copy the contents of the `.env.example` file into `.env`.

Some variables needs to be replaced, they are tagged with the `REPLACE_AT_INSTALLATION` tag - see below for those that require some setup.

#### Infura

Set up an account on [Infura](https://www.infura.io/) and create a new API key

#### Github Personal Access Token

Go to [your GitHub settings token page](https://github.com/settings/tokens) and create a new Personal Access Tokens - Tokens (classic).

### Docker-compose

This useful command can be used to start the Docker containers, and also to wipe the database clean and restart the Docker containers at any time:

```
make docker/re
```

### Backend

Starting the backend service is a bit more involved and requires more setup.

```
yarn run backend:api
yarn run backend:event-store
yarn run backend:event-listeners
yarn run backend:github-proxy
yarn run backend:action-dequeuer
yarn run backend:github-indexer
yarn run backend:dusty-bot
```

Then start the Hasura server:

```
yarn hasura:console
```

### Frontend

Install [Vite](https://vitejs.dev/) - with Homebrew:

```
brew install vite
```


Install packages with:

```
yarn
```


You can then start the frontend with:

```
yarn dev
```

If you plan on running end-to-end tests, use:

```
yarn dev ---host
```


### Codegen

A code generation plugin is used to automatically generate Typescript types for the frontend,
based on the queries provided by Hasura as well as queries defined in `queries.graphql` files.

It can be launched in watch mode with the following command :

```
yarn generate --watch
```

### LazyNPM (experimental)

You can use [LazyNPM](https://github.com/jesseduffield/lazynpm) to have a graphical interface allowing to launch the scripts more quickly.

This is convenient but the GUI tends to break down when one of the services encounters an error.

When LazyNPM is installed, you can just launch it at the root of the project with:

```
lazynpm
```

## Other

### How to create a project locally ?

This examples works for a local setup but also work in stagin or development by going to [the develop](http://develop.hasura.onlydust.xyz) or [staging](staging.hasura.onlydust.xyz) Hasura consoles.

Laucnh the hasura console by running:

```
yarn hasura/console
```

Access the GraphiQL interface (test tube icon tab) of the [local Hasura console](http://localhost:9695).

Add a *mutation* in the lower left corner, and choose the `createProject` mutation - with as parameters (for example):

```typescript
mutation MyMutation {
  createProject(
    longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ...",
    name: "Lorem",
	shortDescription: "Lorem Ipsum",
	initialBudget: 10000,
	visibility: PUBLIC
  )
}
```

Run the mutation with the "Play" symbol.

The project will be created

### How to become a project leader ?

Then, save the project ID that is displayed by the interface, e.g.:

```json
{
  "data": {
    "createProject": "92c22e51-5e21-44d5-bf51-d8d265849ce5"
  }
}
```

Finally, you need to invite yourself as a project leader. To achieve this, you will need the project ID shown above as well as you GitHub user ID, which can be found using the *GitHub users API*, for example: https://api.github.com/users/oscarwroche .

```typescript
mutation MyMutation {
  inviteProjectLeader(
    githubUserId: 21149076,
	projectId: "92c22e51-5e21-44d5-bf51-d8d265849ce5"
  )
}
```

Then, go to the marketplace's home page, logged in as the aforementioned GitHub user. You should see an invite that you can accept to become a project leader, and access the payment sending options.

#### Linking a GitHub repo

*It is important to follow these instructions, otherwise multiple issues will be created on public repositories when sending a payment request*

*Fork* an existing repo with the *onlydustxyz* oragnization.

Then, call the `linkGithubRepo` mutation using the project ID shown above, and the ID of this repo, which can be found thanks to the *Github Repos API*, for example: https://api.github.com/repos/facebook/react .

```typescript
mutation MyMutation {
  linkGithubRepo(
    githubRepoId: 78853160,
	projectId: "92c22e51-5e21-44d5-bf51-d8d265849ce5"
  )
}
```


