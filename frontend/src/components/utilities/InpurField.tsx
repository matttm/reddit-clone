import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Textarea,
    InputProps
} from '@chakra-ui/core';
import {InputTypeEnum} from "../../constants/input-type.constant";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    inputTypeString?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    inputTypeString,
    size: _,
    ...props
}) => {
    let InputType: React.FC<InputProps>;
    switch (inputTypeString) {
        case InputTypeEnum.INPUT:
            InputType = Input;
            break;
        case InputTypeEnum.TEXTAREA:
            InputType = Textarea;
            break;
        default:
            console.log('Defaulting to input field');
            InputType = Input;
    }
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <InputType {...field} {...props} id={field.name} />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    );
};
