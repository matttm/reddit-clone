import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

/**
 * A standardized post item
 *
 * @param id a post id
 * @param title the post title
 * @param createdAt when post was made
 * @param person post author
 * @constructor
 */
const Post: React.FC<any> = ({ id, title, createdAt, person }) => {
    return (
        <Flex bg={'#252531'} padding={'10px'} direction={'column'}>
            <a href={`/posts/${id}`}>
                <Text fontSize={'16px'} fontWeight={'bold'}>
                    {title}
                </Text>
            </a>
            <Text fontSize={'12px'} fontWeight={'light'} color={'lightgrey'}>
                Created by {person.username} at {createdAt}
            </Text>
        </Flex>
    );
};

export default Post;
