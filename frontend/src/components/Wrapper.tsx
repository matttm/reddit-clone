import React from 'react';
import { Box } from '@chakra-ui/react';
import { VariantsEnum } from '../types';

interface wrapperProps {
    variant?: 'small' | 'regular';
}

export const Wrapper: React.FC<wrapperProps> = ({
    children,
    variant = VariantsEnum.regular.description
}) => {
    return (
        <Box mt={8} mx="auto" maxW={VariantsEnum[variant].size} w="100%">
            {children}
        </Box>
    );
};

export default Wrapper;
