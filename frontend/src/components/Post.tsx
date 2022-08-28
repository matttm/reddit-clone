import React from 'react';
import { Flex, Text } from '@chakra-ui/core';

const Post: React.FC<any> = ({ title, createdAt, person }) => {
    return (
        <Flex padding={'10px'} direction={'column'}>
            <Text fontSize={'16px'} fontWeight={'bold'}>
                {title}
            </Text>
            <Text fontSize={'12px'} fontWeight={'light'} color={'gray'}>
                Created by {person.username} at {createdAt}
            </Text>
        </Flex>
    );
};

export default Post;
