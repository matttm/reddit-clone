import React from 'react';
import { Formik, Form } from 'formik';
import {
    FormControl,
    FormErrorMessage,
    FormLabel
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={(values, actions) => {}}>
            {(props, handleChange) => (
                <Form>
                    <FormControl>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input
                            value={props.username}
                            onChange={handleChange}
                            id="username"
                            placeholder="username"
                        />
                        {/*<FormErrorMessage>{form.errors.name}</FormErrorMessage>*/}
                    </FormControl>
                </Form>
            )}
        </Formik>
    );
};

export default Register;
