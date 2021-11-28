import React from 'react';
import { Formik, Form } from 'formik';
import Wrapper from '../components/Wrapper';
import { VariantsEnum } from '../types';
import { InputField } from '../components/InpurField';
import { Button } from '@chakra-ui/core';
import { useMutation } from 'urql';

interface registerProps {}

const REGISTER_MUTATION = `
mutation Register($username: String!, $password: String!) {
  register(credentials: { username: $username, password: $password }) {
    id
    username
    createdAt
  }
}`;

export const Register: React.FC<registerProps> = ({}) => {
    const [, register] = useMutation(REGISTER_MUTATION);
    return (
        <Wrapper variant={VariantsEnum.regular.description}>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={(values, actions) => {
                    register(values);
                }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                        />
                        <InputField
                            name="password"
                            placeholder="password"
                            label="Password"
                        />
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            variantColor="green">
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default Register;
