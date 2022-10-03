import React, {useContext} from 'react';
import {Formik} from 'formik';
import Wrapper from '../components/utilities/Wrapper';
import {VariantsEnum} from '../types';
import {useLoginMutation} from '../generated/graphql';
import * as Yup from 'yup';
import {passwordValidation, usernameValidation} from '../validation/credentials.validation';
import {useRouter} from 'next/router';
import {setToken} from '../services/authentication.service';
import {GlobalContext} from "../context/GlobalContext";
import UserForm from "../components/forms/UserForm";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
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
                    // if (!res?.data) {
                    //     const m = {};
                    //     // @ts-ignore
                    //     m['username'] = 'Invalid username or password';
                    //     // @ts-ignore
                    //     m['password'] = 'Invalid username or password';
                    //     setErrors(m);
                    // }
                    // @ts-ignore
                    const data = (await res.json())?.login;
                    const token = data?.token;
                    const person = data?.person;
                    console.log('login', data)
                    setToken(token);
                    setIsAuthenticated(token !== '');
                    setPerson(person);
                    router.push('/');
                    return res;
                }}>
                {({ isSubmitting }) => (
                    <UserForm isSubmitting={isSubmitting} buttonText={'Login'}/>
                )}
            </Formik>
        </Wrapper>
    );
};

export default Login;
