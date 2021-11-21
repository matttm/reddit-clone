import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation,
    Query,
    Resolver
} from 'type-graphql';
import { hash, verify } from 'argon2';

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
    @Mutation(() => User, { nullable: true })
    async register(
        @Arg('credentials') credentials: Credentials,
        @Ctx() { userRepository }: Context
    ): Promise<User | null> {
        const { username, password } = credentials;
        const taken = await userRepository.findOne({
            username
        });
        if (taken) {
            return null;
        }
        return userRepository.save(
            userRepository.create({
                username,
                password: await hash(password)
            })
        );
    }

    @Mutation(() => User, { nullable: true })
    async login(
        @Arg('credentials') credentials: Credentials,
        @Ctx() { userRepository }: Context
    ): Promise<User | null> {
        const { username, password } = credentials;
        const user = await userRepository.findOne({
            username
        });
        if (!user) {
            return null;
        }
        console.log(`User ${username} exists`);
        const matches = await verify(user.password, password);
        if (!matches) {
            console.log(
                `User ${username} provided an incorrect password: ${matches}`
            );
            return null;
        }
        console.log(
            `User ${username} provided the correct password: ${matches}`
        );
        return user;
    }

    @Query(() => [User])
    users(@Ctx() { userRepository }: Context): Promise<User[]> {
        return userRepository.find();
    }
}
