import {Repository} from "typeorm";
import {Post} from "./entities/post";

export type Context = {
    id: string;
    postRepository: Repository<Post>;
}
