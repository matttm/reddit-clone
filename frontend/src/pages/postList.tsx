import React from 'react';
import { useGetPostsQuery } from '../generated/graphql';

export const getStaticProps = async () => {};
export const PostList: React.FC<any> = () => {
    const [result, rexecuteQuery] = useGetPostsQuery();
    const { data, fetching, error } = result;

    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    return <h3>Post</h3>;
};

export default PostList;
