import React from "react";
import {useDeletePostMutation} from "../../generated/graphql";
import {Button, Flex, Text} from "@chakra-ui/core";
import Wrapper from "../utilities/Wrapper";
import {VariantsEnum} from "../../types";
import {Form, Formik} from "formik";
import {useRouter} from "next/router";

const DeletePost: React.FC<any> = ({ postId, children }) => {
    const router = useRouter();
    const [, deletePost] = useDeletePostMutation();
    return (
        <Wrapper variant={VariantsEnum.regular.description}>
            <Formik
                initialValues={{ postId: 1 }}
                onSubmit={async (values) => {
                    router.push('/posts');
                    return null;
                }}>
                {({ isSubmitting }) => (
                    <Form>
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
}

export default DeletePost;
