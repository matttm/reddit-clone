import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Post } from '../entities/post';
import { Context } from '../types';

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(@Ctx() { postRepository }: Context): Promise<Post[]> {
        return postRepository.find();
    }
    @Query(() => Post)
    post(
        @Arg('id', () => Int) id: number,
        @Ctx() { postRepository }: Context
    ): Promise<Post | undefined> {
        return postRepository.findOne({
            where: { id }
        });
    }
    @Mutation(() => Post)
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
}
