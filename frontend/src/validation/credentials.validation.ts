import * as Yup from 'yup';

export const usernameValidation = {
    username: Yup.string()
        .min(3, 'Must be more than 2 characters')
        .required('Required')
};

export const passwordValidation = {
    password: Yup.string()
        .min(8, 'Must be more than 8 characters')
        .required('Required')
};
