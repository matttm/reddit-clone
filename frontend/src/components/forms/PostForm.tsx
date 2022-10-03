import React from "react";
import {Form} from "formik";
import {InputField} from "../utilities/InpurField";
import {InputTypeEnum} from "../../types";
import {Button} from "@chakra-ui/core";

const PostForm: React.FC<any>= ({ buttonText, isSubmitting }) => {
    return (
        <>
            <Form>
                <InputField
                    name="title"
                    placeholder="title"
                    label="title"
                    inputTypeString={InputTypeEnum.TEXTAREA}
                />
                <InputField
                    name="body"
                    placeholder="body"
                    label="body"
                    inputTypeString={InputTypeEnum.TEXTAREA}
                />
                <Button
                    marginTop={8}
                    type="submit"
                    isLoading={isSubmitting}
                    variantColor="green">
                    {buttonText}
                </Button>
            </Form>
        </>
    );
};

export default PostForm;
