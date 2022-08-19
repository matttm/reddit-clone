import React from 'react';
import { useGetPostsQuery } from '../generated/graphql';

export const PostList: React.FC<any> = () => {
    const [result, reexecuteQuery] = useGetPostsQuery();
    const { data, fetching, error } = result;

    console.log(result);
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    if (!data) return <p>Data is corrupt</p>;
    if (data.posts.length <= 0) return <p>There are no posts to display</p>;
    return (
        <ul>
            {data.posts.map(post => {
                return <li key={post.id}>{post.title}</li>;
            })}
        </ul>
    );
};

export default PostList;
