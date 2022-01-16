import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation,
    ObjectType,
    Query,
    Resolver
} from 'type-graphql';

import { hash, verify } from 'argon2';

import { Context } from '../types';
import { Person } from '../entities/person';
import { getTokens } from '../utilities/auth.utilities';

@InputType()
export class Credentials {
    @Field()
    username: string;
    @Field()
    password: string;
}

@ObjectType()
export class Tokens {
    accessToken: string;
    refreshToken: string;
}

@ObjectType()
export class PersonValidationErrors {
    errors: string[];
}

@ObjectType()
export class PersonValidationObject {
    person?: Person;
    tokens?: Tokens;
    validationErrors?: PersonValidationErrors;
}

@Resolver()
export class PersonResolver {
    @Mutation(() => PersonValidationObject, { nullable: false })
    async register(
        @Arg('credentials') credentials: Credentials,
        @Ctx() { personRepository }: Context
    ): Promise<PersonValidationObject> {
        const { username, password } = credentials;
        const taken = await personRepository.findOne({
            username
        });
        if (taken) {
            return {
                validationErrors: {
                    errors: ['Username is taken']
                }
            };
        }
        return {
            person: await personRepository.save(
                personRepository.create({
                    username,
                    password: await hash(password)
                })
            )
        };
    }

    @Mutation(() => PersonValidationObject, { nullable: false })
    async login(
        @Arg('credentials') credentials: Credentials,
        @Ctx() { personRepository }: Context
    ): Promise<PersonValidationObject> {
        const errorObj = {
            validationErrors: {
                errors: ['Username or password is invalid']
            }
        };
        const { username, password } = credentials;
        const user = await personRepository.findOne({
            username
        });
        if (!user) {
            return errorObj;
        }
        console.log(`User ${username} exists`);
        const matches = await verify(user.password, password);
        if (!matches) {
            console.log(
                `User ${username} provided an incorrect password: ${matches}`
            );
            return errorObj;
        }
        console.log(
            `User ${username} provided the correct password: ${matches}`
        );
        return {
            person: user,
            tokens: getTokens(user)
        };
    }

    @Query(() => [Person])
    persons(@Ctx() { personRepository }: Context): Promise<Person[]> {
        return personRepository.find();
    }
}
