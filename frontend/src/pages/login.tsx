import React from 'react';
import { Form, Formik } from 'formik';
import Wrapper from '../components/Wrapper';
import { VariantsEnum } from '../types';
import { InputField } from '../components/InpurField';
import { Button } from '@chakra-ui/core';
import { useLoginMutation } from '../generated/graphql';
import * as Yup from 'yup';
import {
    passwordValidation,
    usernameValidation
} from '../validation/credentials.validation';

interface loginProps {}

export const Login: React.FC<loginProps> = ({}) => {
    const [, login] = useLoginMutation();
    return (
        <Wrapper variant={VariantsEnum.regular.description}>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={Yup.object().shape({
                    ...usernameValidation,
                    ...passwordValidation
                })}
                onSubmit={async (values, { setErrors }) => {
                    const res = await login(values);
                    if (!res?.data?.login) {
                        const m = {};
                        // @ts-ignore
                        m['username'] = 'Invalid username or password';
                        // @ts-ignore
                        m['password'] = 'Invalid username or password';
                        setErrors(m);
                    }
                    return res;
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
                            marginTop={8}
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

export default Login;
