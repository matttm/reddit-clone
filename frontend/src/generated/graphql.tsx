import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export function useRegisterMutation() {
    return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
        RegisterDocument
    );
}
