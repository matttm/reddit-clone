import "reflect-metadata";
import {createConnection} from "typeorm";
import {Post} from "./entities/post";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const post = new Post();
    post.title = 'Test post';

    await connection.manager.save(post);
    console.log("Saved a new post with id: " + post.id);

    console.log("Loading posts from the database...");
    const posts = await connection.manager.find(Post);
    console.log("Loaded posts: ", post);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
