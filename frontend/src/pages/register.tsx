import React from 'react';
import { Formik, Form } from 'formik';
import Wrapper from '../components/Wrapper';
import { VariantsEnum } from '../types';
import { InputField } from '../components/InpurField';

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
    return (
        <Wrapper variant={VariantsEnum.small.description}>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={(values, actions) => {}}>
                {(props, handleChange) => (
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
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default Register;
