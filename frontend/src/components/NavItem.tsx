import React from 'react';
import { Box, Link } from '@chakra-ui/core';

const NavItem: React.FC<any> = props => {
    const { active, navTo, onClick } = props;
    return (
        <Box border={active ? '1px' : 0} borderBottomColor={'white'}>
            <Link href={navTo} color={'white'} onClick={onClick}>
                {props.children}
            </Link>
        </Box>
    );
};
export default NavItem;
