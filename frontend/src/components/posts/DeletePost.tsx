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
        <>
            <Wrapper variant={VariantsEnum.regular.description}>
                <Formik
                    initialValues={{ postId }}
                    onSubmit={async (values) => {
                        // router.push('/posts');
                        return values;
                    }}>
                    {({ isSubmitting }) => (
                        <Flex direction={'row'}>
                            <Text>Are you sure you want to delete this post?</Text>
                            <Button
                                marginTop={8}
                                type="submit"
                                isLoading={isSubmitting}
                                variantColor="green">
                                Confirm
                            </Button>
                        </Flex>
                    )}
                </Formik>
            </Wrapper>
        </>
    );
}

export default DeletePost;
