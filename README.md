# Reddit Clone

Development Status: 🟢 Active

Development has temporarily been suspended as of 03-17-2022

## Description

A GraphQL based web application meant to be an immitation of Reddit.

## Getting Started

When running for the server for the first time, run the following commands

```bash
docker compose up &
npm run dev:init
```

This will start the docker containers that hold the databases--one for redis and one for mysql, start the server, and run the migrations.

Once the server has been initialized, all subsequent uses can be done with (given that the same docker container is running):

```bash
npm run dev
```

When done the containers can be killed with

```bash
docker compose down
```

## Enhancements

### Migrations

If you need to add a migration, the `migrations` folder must be specified

From the backend folder:

```bash
npx typeorm migration:generate -n migratin-name -d src/migration
```

## Authors

-   Matt Maloney : matttm

## Contribute

If you want to contribute, just send me a message.
