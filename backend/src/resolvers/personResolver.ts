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
import { Person } from '../entities/person';

@InputType()
export class Credentials {
    @Field()
    username: string;
    @Field()
    password: string;
}

@Resolver()
export class PersonResolver {
    @Mutation(() => Person, { nullable: true })
    async register(
        @Arg('credentials') credentials: Credentials,
        @Ctx() { personRepository }: Context
    ): Promise<Person | null> {
        const { username, password } = credentials;
        const taken = await personRepository.findOne({
            username
        });
        if (taken) {
            return null;
        }
        return personRepository.save(
            personRepository.create({
                username,
                password: await hash(password)
            })
        );
    }

    @Mutation(() => Person, { nullable: true })
    async login(
        @Arg('credentials') credentials: Credentials,
        @Ctx() { personRepository, req }: Context
    ): Promise<Person | null> {
        const { username, password } = credentials;
        const user = await personRepository.findOne({
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
        // @ts-ignore
        req.session.userId = user.id;
        console.log(
            `User ${username} provided the correct password: ${matches}`
        );
        return user;
    }

    @Query(() => [Person])
    users(@Ctx() { personRepository }: Context): Promise<Person[]> {
        return personRepository.find();
    }
}
