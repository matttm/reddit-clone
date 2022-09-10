import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
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
  isAuthenticated: PersonValidationObject;
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

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'PostValidationObject' }
    & { post: (
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'title' | 'body'>
    ) }
  ) }
);

export type GetPersonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersonsQuery = (
  { __typename?: 'Query' }
  & { persons: Array<(
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'username' | 'createdAt'>
  )> }
);

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'body' | 'views' | 'createdAt'>
    & { person: (
      { __typename?: 'Person' }
      & Pick<Person, 'username'>
    ) }
  ) }
);

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'body' | 'views' | 'createdAt'>
    & { person: (
      { __typename?: 'Person' }
      & Pick<Person, 'username'>
    ) }
  )> }
);

export type IsAuthenticatedQueryVariables = Exact<{ [key: string]: never; }>;


export type IsAuthenticatedQuery = (
  { __typename?: 'Query' }
  & { isAuthenticated: (
    { __typename?: 'PersonValidationObject' }
    & { person?: Maybe<(
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'username'>
    )>, validationErrors?: Maybe<(
      { __typename?: 'ValidationErrors' }
      & Pick<ValidationErrors, 'errors'>
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'PersonValidationObject' }
    & Pick<PersonValidationObject, 'token'>
    & { person?: Maybe<(
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'username' | 'createdAt'>
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'PersonValidationObject' }
    & { person?: Maybe<(
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'username' | 'createdAt'>
    )> }
  ) }
);


export const CreatePostDocument = gql`
    mutation createPost($title: String!, $body: String!) {
  createPost(post: {title: $title, body: $body}) {
    post {
      id
      title
      body
    }
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const GetPersonsDocument = gql`
    query getPersons {
  persons {
    id
    username
    createdAt
  }
}
    `;

export function useGetPersonsQuery(options: Omit<Urql.UseQueryArgs<GetPersonsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPersonsQuery>({ query: GetPersonsDocument, ...options });
};
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    id
    title
    body
    views
    person {
      username
    }
    createdAt
  }
}
    `;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
};
export const GetPostsDocument = gql`
    query getPosts {
  posts {
    id
    title
    body
    views
    createdAt
    person {
      username
    }
  }
}
    `;

export function useGetPostsQuery(options: Omit<Urql.UseQueryArgs<GetPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostsQuery>({ query: GetPostsDocument, ...options });
};
export const IsAuthenticatedDocument = gql`
    query isAuthenticated {
  isAuthenticated {
    person {
      id
      username
    }
    validationErrors {
      errors
    }
  }
}
    `;

export function useIsAuthenticatedQuery(options: Omit<Urql.UseQueryArgs<IsAuthenticatedQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<IsAuthenticatedQuery>({ query: IsAuthenticatedDocument, ...options });
};
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  login(credentials: {username: $username, password: $password}) {
    person {
      id
      username
      createdAt
    }
    token
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation register($username: String!, $password: String!) {
  register(credentials: {username: $username, password: $password}) {
    person {
      id
      username
      createdAt
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};