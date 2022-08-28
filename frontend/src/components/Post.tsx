import React from 'react';
import { Flex, Text } from '@chakra-ui/core';
import theme from '../theme';

const Post: React.FC<any> = ({ title, createdAt, person }) => {
    return (
        <Flex bg={'#252531'} padding={'10px'} direction={'column'}>
            <Text fontSize={'16px'} fontWeight={'bold'}>
                {title}
            </Text>
            <Text fontSize={'12px'} fontWeight={'light'} color={'lightgrey'}>
                Created by {person.username} at {createdAt}
            </Text>
        </Flex>
    );
};

export default Post;
