import React from 'react';
import { Box } from '@chakra-ui/core';
import {VariantsEnum} from "../../constants/variant.constant";

interface wrapperProps {
    variant?: 'small' | 'regular';
}

export const Wrapper: React.FC<wrapperProps> = ({
    children,
    variant = VariantsEnum.small.description
}) => {
    return (
        <Box mt={5} mx="auto" maxW={VariantsEnum[variant].size} w="100%">
            {children}
        </Box>
    );
};

export default Wrapper;
