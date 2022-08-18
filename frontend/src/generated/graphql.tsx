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
    password: Scalars['String'];
    username: Scalars['String'];
};

export type Mutation = {
    __typename?: 'Mutation';
    createPost: PostValidationObject;
    deletePost: Scalars['Int'];
    login: PersonValidationObject;
    register: PersonValidationObject;
    updatePost: Post;
    refreshToken: Scalars['String'];
};

export type MutationCreatePostArgs = {
    post: PostInput;
};

export type MutationDeletePostArgs = {
    id: Scalars['Float'];
};

export type MutationLoginArgs = {
    credentials: Credentials;
};

export type MutationRegisterArgs = {
    credentials: Credentials;
};

export type MutationUpdatePostArgs = {
    body: Scalars['String'];
    id: Scalars['Float'];
    title: Scalars['String'];
};

export type MutationRefreshTokenArgs = {
    input: RefreshTokenInput;
};

export type Person = {
    __typename?: 'Person';
    id: Scalars['ID'];
    username: Scalars['String'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
};

export type PersonValidationObject = {
    __typename?: 'PersonValidationObject';
    person?: Maybe<Person>;
    token?: Maybe<Scalars['String']>;
    validationErrors?: Maybe<ValidationErrors>;
};

export type Post = {
    __typename?: 'Post';
    id: Scalars['ID'];
    title: Scalars['String'];
    body: Scalars['String'];
    views: Scalars['Int'];
    createdAt: Scalars['DateTime'];
    updatedAt: Scalars['DateTime'];
    person: Person;
};

export type PostInput = {
    title: Scalars['String'];
    body: Scalars['String'];
};

export type PostValidationObject = {
    __typename?: 'PostValidationObject';
    post: Post;
    errors?: Maybe<ValidationErrors>;
};

export type Query = {
    __typename?: 'Query';
    hello: Scalars['String'];
    persons: Array<Person>;
    post: Post;
    posts: Array<Post>;
};

export type QueryPostArgs = {
    id: Scalars['Int'];
};

export type RefreshTokenInput = {
    token: Scalars['String'];
};

export type ValidationErrors = {
    __typename?: 'ValidationErrors';
    errors: Array<Scalars['String']>;
};

export type CreatePostMutationMutationVariables = Exact<{
    title: Scalars['String'];
    body: Scalars['String'];
}>;

export type CreatePostMutationMutation = { __typename?: 'Mutation' } & {
    createPost: { __typename?: 'PostValidationObject' } & {
        post: { __typename?: 'Post' } & Pick<Post, 'id' | 'title' | 'body'>;
    };
};

export type LoginMutationMutationVariables = Exact<{
    username: Scalars['String'];
    password: Scalars['String'];
}>;

export type LoginMutationMutation = { __typename?: 'Mutation' } & {
    register: { __typename?: 'PersonValidationObject' } & {
        person?: Maybe<
            { __typename?: 'Person' } & Pick<
                Person,
                'id' | 'username' | 'createdAt'
            >
        >;
    };
};

export type RegisterMutationMutationVariables = Exact<{
    username: Scalars['String'];
    password: Scalars['String'];
}>;

export type RegisterMutationMutation = { __typename?: 'Mutation' } & {
    register: { __typename?: 'PersonValidationObject' } & {
        person?: Maybe<
            { __typename?: 'Person' } & Pick<
                Person,
                'id' | 'username' | 'createdAt'
            >
        >;
    };
};

export const CreatePostMutationDocument = gql`
    mutation createPostMutation($title: String!, $body: String!) {
        createPost(post: { title: $title, body: $body }) {
            post {
                id
                title
                body
            }
        }
    }
`;

export function useCreatePostMutationMutation() {
    return Urql.useMutation<
        CreatePostMutationMutation,
        CreatePostMutationMutationVariables
    >(CreatePostMutationDocument);
}
export const LoginMutationDocument = gql`
    mutation loginMutation($username: String!, $password: String!) {
        register(credentials: { username: $username, password: $password }) {
            person {
                id
                username
                createdAt
            }
        }
    }
`;

export function useLoginMutationMutation() {
    return Urql.useMutation<
        LoginMutationMutation,
        LoginMutationMutationVariables
    >(LoginMutationDocument);
}
export const RegisterMutationDocument = gql`
    mutation registerMutation($username: String!, $password: String!) {
        register(credentials: { username: $username, password: $password }) {
            person {
                id
                username
                createdAt
            }
        }
    }
`;

export function useRegisterMutationMutation() {
    return Urql.useMutation<
        RegisterMutationMutation,
        RegisterMutationMutationVariables
    >(RegisterMutationDocument);
}
