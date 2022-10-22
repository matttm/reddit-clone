import React from "react";
import {Form} from "formik";
import {InputField} from "../utilities/InpurField";
import {Button} from "@chakra-ui/core";

/**
 * A general form for a user (login and register)
 *
 * @param isSubmitting
 * @param buttonText
 * @constructor
 */
const UserForm: React.FC<any> = ({ isSubmitting, buttonText }) => {
    return (
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
                variantColor="green"
            >
                {buttonText}
            </Button>
        </Form>
    );
};

export default UserForm;
