import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello.resolver';
import { PostResolver } from './resolvers/post.resolver';
import { v4 as uuid } from 'uuid';
import { Post } from './entities/post';
import { User } from './entities/user';
import { UserResolver } from './resolvers/user.resolver';

import session from 'express-session';
import redis from 'redis';

import ConnectRedis from 'connect-redis';

const RedisStore = ConnectRedis(session);
const redisClient = redis.createClient();

createConnection()
    .then(async connection => {
        const isProduction = process.env.NODE_ENV === 'PRODUCTION';
        const cookieAge: number =
            (process.env.COOKIE_MAX_AGE as unknown as number) ||
            1000 * 60 * 60 * 24;
        const app = express();
        app.use(
            session({
                store: new RedisStore({
                    client: redisClient,
                    disableTouch: true
                }),
                name: uuid(),
                cookie: {
                    maxAge: cookieAge,
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: isProduction
                },
                saveUninitialized: false,
                secret: process.env.COOKIE_SECRET || 'keyboard cat',
                resave: false
            })
        );
        const server = new ApolloServer({
            schema: await buildSchema({
                resolvers: [HelloResolver, PostResolver, UserResolver],
                validate: false
            }),
            context: ({ req, res }) => ({
                id: uuid(),
                isProduction,
                req,
                res,
                postRepository: connection.getRepository(Post),
                userRepository: connection.getRepository(User)
            })
        });
        server.applyMiddleware({ app });

        app.listen(3000, () => console.log('Listening at 3000'));
    })
    .catch(error => console.log(error));
