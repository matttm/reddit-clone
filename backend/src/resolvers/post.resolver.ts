import {
    Arg,
    Ctx,
    Int,
    Mutation,
    Query,
    Resolver,
    UseMiddleware
} from 'type-graphql';
import { Post } from '../entities/post';
import { Context } from '../types';
import { authorizationMiddleware } from '../middleware/auth.middleware';

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    @UseMiddleware(authorizationMiddleware)
    posts(@Ctx() { postRepository }: Context): Promise<Post[]> {
        return postRepository.find();
    }
    @Query(() => Post)
    @UseMiddleware(authorizationMiddleware)
    post(
        @Arg('id', () => Int) id: number,
        @Ctx() { postRepository }: Context
    ): Promise<Post | undefined> {
        return postRepository.findOne({
            where: { id }
        });
    }
    @Mutation(() => Post)
    @UseMiddleware(authorizationMiddleware)
    createPost(
        @Arg('title') title: string,
        @Ctx() { postRepository }: Context
    ): Promise<Post> {
        return postRepository.save(
            postRepository.create({
                title: title
            })
        );
    }
    @Mutation(() => Post)
    @UseMiddleware(authorizationMiddleware)
    async updatePost(
        @Arg('id') id: number,
        @Arg('title') title: string,
        @Ctx() { postRepository }: Context
    ): Promise<Post> {
        const ret = await postRepository.update(
            {
                id: id
            },
            {
                title: title
            }
        );
        return ret.raw;
    }
    @Mutation(() => Int)
    @UseMiddleware(authorizationMiddleware)
    async deletePost(
        @Arg('id') id: number,
        @Ctx() { postRepository }: Context
    ): Promise<number | null | undefined> {
        const ret = await postRepository.delete({
            id: id
        });
        return ret.affected;
    }
}
