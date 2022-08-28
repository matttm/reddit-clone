import React from 'react';
import { Box, Link } from '@chakra-ui/core';
import { useRouter } from 'next/router';

const NavItem: React.FC<any> = props => {
    const router = useRouter();
    const { navTo, onClick } = props;
    const active = router.pathname === navTo;
    return (
        <Box
            border={active ? '1px' : 0}
            borderBottomColor={'white'}
            padding={'2px'}>
            <Link href={navTo} color={'white'} onClick={onClick}>
                {props.children}
            </Link>
        </Box>
    );
};
export default NavItem;