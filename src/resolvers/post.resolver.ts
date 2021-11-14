import {Ctx, Query, Resolver} from "type-graphql";
import { Post } from '../entities/post';
import {Context} from "../types";

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(@Ctx() { postRepository }: Context) {
        return postRepository.find();
    }
}
