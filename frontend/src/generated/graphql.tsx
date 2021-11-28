import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
    DateTime: any;
};

export type Credentials = {
    username: Scalars['String'];
    password: Scalars['String'];
};

export type Mutation = {
    __typename?: 'Mutation';
    createPost: Post;
    updatePost: Post;
    deletePost: Scalars['Int'];
    register?: Maybe<User>;
    login?: Maybe<User>;
};

export type MutationCreatePostArgs = {
    title: Scalars['String'];
};

export type MutationUpdatePostArgs = {
    title: Scalars['String'];
    id: Scalars['Float'];
};

export type MutationDeletePostArgs = {
    id: Scalars['Float'];
};

export type MutationRegisterArgs = {
    credentials: Credentials;
};

export type MutationLoginArgs = {
    credentials: Credentials;
};

export type Post = {
    __typename?: 'Post';
    id: Scalars['Float'];
    title: Scalars['String'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
};

export type Query = {
    __typename?: 'Query';
    hello: Scalars['String'];
    posts: Array<Post>;
    post: Post;
    users: Array<User>;
};

export type QueryPostArgs = {
    id: Scalars['Int'];
};

export type User = {
    __typename?: 'User';
    id: Scalars['Float'];
    username: Scalars['String'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
};

export type RegisterMutationVariables = Exact<{
    username: Scalars['String'];
    password: Scalars['String'];
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & {
    register?: Maybe<
        { __typename?: 'User' } & Pick<User, 'id' | 'username' | 'createdAt'>
    >;
};

export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
        register(credentials: { username: $username, password: $password }) {
            id
            username
            createdAt
        }
    }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
    RegisterMutation,
    RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
    baseOptions?: Apollo.MutationHookOptions<
        RegisterMutation,
        RegisterMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
        RegisterDocument,
        options
    );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
    RegisterMutation,
    RegisterMutationVariables
>;
