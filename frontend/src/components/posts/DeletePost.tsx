import React from "react";
import {useDeletePostMutation} from "../../generated/graphql";

const DeletePost: React.FC<any> = ({ postId, children }) => {
    const [, deletePost] = useDeletePostMutation();
    return (
        <>
            <p>
                Are you sure you want to delete this post?
            </p>
            <form>
                <button type={'submit'}>Confirm</button>
                <button>Cancel</button>
            </form>
        </>
    );
}

export default DeletePost;
