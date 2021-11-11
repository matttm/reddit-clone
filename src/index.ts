import "reflect-metadata";
import {createConnection} from "typeorm";
import {Post} from "./entities/post";
import express from 'express';

createConnection().then(async connection => {

    const app = express();
    app.get('/', (req, res) => {
        console.log('Up and running');
    });
    app.listen(3000, () => console.log('Listening at 3000'));
}).catch(error => console.log(error));
