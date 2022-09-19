import React from "react";

const DeletePost: React.FC<any> = ({ postId, children }) => {
    return (
        <p>
            Are you sure you want to delete this post?
        </p>
    );
}

export default DeletePost;
