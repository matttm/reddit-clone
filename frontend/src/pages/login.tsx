import React, {useContext} from 'react';
import { Form, Formik } from 'formik';
import Wrapper from '../components/utilities/Wrapper';
import { VariantsEnum } from '../types';
import { InputField } from '../components/utilities/InpurField';
import { Button } from '@chakra-ui/core';
import { useLoginMutation } from '../generated/graphql';
import * as Yup from 'yup';
import {
    passwordValidation,
    usernameValidation
} from '../validation/credentials.validation';
import { useRouter } from 'next/router';
import { setAuthInfo, setToken } from '../services/authentication.service';
import {GlobalContext} from "../context/GlobalContext";

interface loginProps {}

export const Login: React.FC<loginProps> = ({}) => {
    const router = useRouter();
    const { person, isAuthenticated, setIsAuthenticated, setPerson } = useContext(GlobalContext);
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
                    const res = await fetch('/api/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                            },
                            body: JSON.stringify({
                                username: values.username,
                                password: values.password
                            })
                        });
                    // console.log('res', res);
                    // if (!res?.data) {
                    //     const m = {};
                    //     // @ts-ignore
                    //     m['username'] = 'Invalid username or password';
                    //     // @ts-ignore
                    //     m['password'] = 'Invalid username or password';
                    //     setErrors(m);
                    // }
                    // @ts-ignore
                    // const data = res.res?.login;
                    // const token = data?.token;
                    // const person = data?.person;
                    // setIsAuthenticated(token !== '');
                    // setPerson({...person});
                    // setToken(token);
                    // setAuthInfo(person?.id, person?.username);
                    //
                    // TODO: route based on response success
                    //
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
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default Login;
