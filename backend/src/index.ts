import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello.resolver';
import { PostResolver } from './resolvers/post.resolver';
import { v4 as uuid } from 'uuid';
import { Post } from './entities/post';
import { Person } from './entities/person';
import { PersonResolver } from './resolvers/person.resolver';
import cors from 'cors';
import * as process from 'process';
import { validateTokensMiddleware } from './middleware/auth.middleware';

createConnection()
    .then(async connection => {
        const isProduction = process.env.NODE_ENV === 'PRODUCTION';
        const port = process.env.PORT || 3001;
        const app = express();
        app.use(
            cors({
                origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
                credentials: true
            })
        );
        const server = new ApolloServer({
            schema: await buildSchema({
                resolvers: [HelloResolver, PostResolver, PersonResolver],
                validate: false
            }),
            context: ({ req, res }) => ({
                id: uuid(),
                isProduction,
                req,
                res,
                postRepository: connection.getRepository(Post),
                personRepository: connection.getRepository(Person)
            })
        });
        app.use(validateTokensMiddleware);
        server.applyMiddleware({
            app,
            cors: false
        });

        app.listen(port, () => console.log(`Listening on port ${port}`));
    })
    .catch(error => console.log(error));
