import React from "react";
import {Form} from "formik";
import {InputField} from "../utilities/InpurField";
import {Button} from '@chakra-ui/react';
import {InputTypeEnum} from "../../constants/input-type.constant";

/**
 * A general form for a post
 *
 * @param buttonText
 * @param isSubmitting
 * @constructor
 */
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
                >
                    {buttonText}
                </Button>
            </Form>
        </>
    );
};

export default PostForm;
