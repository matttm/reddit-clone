import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { hash } from 'argon2';

import { Context } from '../types';
import { User } from '../entities/user';

@InputType()
export class Credentials {
    @Field()
    username: string;
    @Field()
    password: string;
}

@Resolver()
export class UserResolver {
    @Mutation(() => User)
    async register(
        @Arg('credentials') credentials: Credentials,
        @Ctx() { userRepository }: Context
    ): Promise<User | null> {
        const { username, password } = credentials;
        const taken = await userRepository.findOne({
            username
        });
        if (taken) {
            return Promise.resolve(null);
        }
        return userRepository.save(
            userRepository.create({
                username,
                password: await hash(password)
            })
        );
    }
}
