import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {HelloResolver} from "./resolvers/hello.resolver";

createConnection().then(async connection => {

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false
        })
    })
    const app = express();
    server.applyMiddleware({ app });

    app.listen(3000, () => console.log('Listening at 3000'));
}).catch(error => console.log(error));
