import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {HelloResolver} from "./resolvers/hello.resolver";
import {PostResolver} from "./resolvers/post.resolver";
import { v4 as uuid } from 'uuid';
import {Post} from "./entities/post";

createConnection().then(async connection => {

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false,
        }),
        context: () => ({
            id: uuid(),
            postRepository: connection.getRepository(Post)
        })
    })
    const app = express();
    server.applyMiddleware({ app });

    app.listen(3000, () => console.log('Listening at 3000'));
}).catch(error => console.log(error));
