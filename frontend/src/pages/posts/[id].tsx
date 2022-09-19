import React from 'react';
import { usePostQuery } from '../../generated/graphql';
import { Flex, FormHelperText, Text } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import CommentBox from '../../components/posts/CommentBox';
import ActionBar from '../../components/actions/ActionBar';

const Id: React.FC<any> = () => {
    const router = useRouter();
    const { id } = router.query;
    if (!id) {
        return <p>No id provided</p>;
    }
    const [result, reexecuteQuery] = usePostQuery({ variables: { id: +id } });
    const { data, fetching, error } = result;
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    if (!data) return <p>Data is corrupt</p>;
    const { post } = data;
    const { person } = post;
    console.log(post);
    return (
        <Flex direction={'column'} padding={'20px'}>
            <ActionBar creatorId={post?.person?.id}></ActionBar>
            <Flex direction={'column'} padding={'10px'}>
                <Text fontSize={'18px'} fontWeight={'bold'}>
                    {post.title}
                </Text>
                <Text fontSize={'14px'} fontWeight={'light'}>
                    Created by {person.username} at {post.createdAt}
                </Text>
            </Flex>
            <Flex
                direction={'column'}
                padding={'15px'}
                border={'1px'}
                borderColor={'#343444'}
                borderRadius={'2px'}>
                <Text fontSize={'16px'}>{post.body}</Text>
            </Flex>
            <CommentBox></CommentBox>
        </Flex>
    );
};

export default Id;
