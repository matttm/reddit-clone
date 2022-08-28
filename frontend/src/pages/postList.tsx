import React from 'react';
import { useGetPostsQuery } from '../generated/graphql';
import Post from '../components/Post';
import { List, ListItem } from '@chakra-ui/core';

export const PostList: React.FC<any> = () => {
    const [result, reexecuteQuery] = useGetPostsQuery();
    const { data, fetching, error } = result;

    console.log(result);
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    if (!data) return <p>Data is corrupt</p>;
    if (data.posts.length <= 0) return <p>There are no posts to display</p>;
    return (
        <List>
            {data.posts.map(post => {
                return (
                    <ListItem key={post.id}>
                        <Post {...post}></Post>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default PostList;
