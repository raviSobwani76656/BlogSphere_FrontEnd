// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const CommentSection = ({ blogId }) => {
//     const [comments, setComments] = useState([]);
//     const [commentText, setCommentText] = useState("");

//     useEffect(() => {
//         if (blogId) {
//             fetchComments();
//         }
//     }, [blogId]);

//     const fetchComments = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/comments/comment/${blogId}`);
//             setComments(response.data || []);
//         } catch (error) {
//             console.error("Failed to fetch comments", error);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!commentText) return;

//         try {
//             const token = localStorage.getItem("token");
//             await axios.post(
//                 "http://localhost:5000/api/comments/createComment",
//                 { blogId, text: commentText },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             setCommentText("");
//             fetchComments();
//         } catch (error) {
//             console.error("Error submitting the comment", error);
//         }
//     };

//     return (
//         <div style={{ maxWidth: "600px", margin: "20px auto" }}>
//             <form onSubmit={handleSubmit}>
//                 <label>Your Comment</label>
//                 <textarea
//                     value={commentText}
//                     placeholder="Write your comment"
//                     onChange={(e) => setCommentText(e.target.value)}
//                     rows="3"
//                     style={{ display: "block", width: "100%", marginBottom: "10px" }}
//                 ></textarea>

//                 <button type="submit">Add Comment</button>
//             </form>

//             <hr />
//             <h3>Comments</h3>
//             {comments.length === 0 ? (
//                 <p>No comments yet</p>
//             ) : (
//                 comments.map((comment, index) => (
//                     <div key={index} style={{ marginBottom: "10px" }}>
//                         <strong>{comment.name || comment.user?.name || "Anonymous"}</strong>
//                         <p>{comment.comment}</p>
//                         <small>{new Date(comment.createdAt).toLocaleString()}</small>
//                         <hr />
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default CommentSection;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CommentSection = ({ blogId }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [editComment, setEditComment] = useState(null);  // Store the comment to be edited
    const [token, setToken] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setToken(token)
        }
        if (blogId) {
            fetchComments();
        }
    }, [blogId]);



    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/comments/comment/${blogId}`);
            setComments(response.data || []);
        } catch (error) {
            console.error("Failed to fetch comments", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!commentText) return;


        try {
            const token = localStorage.getItem("token");
            const commentData = { blogId, text: commentText };
            let url = "http://localhost:5000/api/comments/createComment";
            let method = "post";
            if (!token) {
                toast.error('Please sign in before commenting!');
                return;
            }

            if (editComment) {
                // If we're editing a comment, use PUT method
                url = `http://localhost:5000/api/comments/updateComment/${editComment._id}`;
                method = "put";
                commentData.comment = commentText;
            }


            await axios({
                method,
                url,
                data: commentData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCommentText("");
            setEditComment(null); // Reset edit state
            fetchComments();
        } catch (error) {
            console.error("Error submitting the comment", error);
        }
    };

    const handleEdit = (comment) => {
        setEditComment(comment);
        setCommentText(comment.comment);  // Pre-fill the text area with the comment's text
    };

    const handleDelete = async (commentId) => {
        try {
            const token = localStorage.getItem("token");

            console.log(commentId, "tettttttt", token);

            await axios.delete(`http://localhost:5000/api/comments/deleteComment/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchComments();

            setCommentText("");
            setEditComment(null);
        } catch (error) {
            console.error("Error deleting the comment", error);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "20px auto" }}>
            <form onSubmit={handleSubmit}>
                <label>Your Comment</label>
                <textarea
                    value={commentText}
                    placeholder="Write your comment"
                    onChange={(e) => setCommentText(e.target.value)}
                    rows="3"
                    style={{ display: "block", width: "100%", marginBottom: "10px" }}
                ></textarea>

                <button style={{ color: "white", backgroundColor: "black" }} type="submit">{editComment ? "Update Comment" : "Add Comment"}</button>
            </form>

            <hr />
            <h3>Comments</h3>
            {comments.length === 0 ? (
                <p>No comments yet</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment._id} style={{ marginBottom: "10px" }}>
                        <strong>{comment.name || comment.user?.name || "Anonymous"}</strong>
                        <p>{comment.comment}</p>
                        <small>{new Date(comment.createdAt).toLocaleString()}</small>
                        {token && <div style={{ marginTop: "10px" }}>
                            <button style={{ color: "white", backgroundColor: "black" }} onClick={() => handleEdit(comment)}>Edit</button>
                            <button style={{ color: "white", backgroundColor: "red" }} onClick={() => handleDelete(comment._id)}>Delete</button>
                        </div>}
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
};

export default CommentSection;
