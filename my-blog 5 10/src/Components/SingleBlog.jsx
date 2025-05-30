


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommentSection from "./commentSection";
import './SingleBlog.css'; // Import the CSS file

const SingleBlog = () => {

    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("token");
    const loggedInUserData = JSON.parse(localStorage.getItem("user"));


    console.log(slug, "thi si slug")



    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/${slug}`);
                console.log('Fetched Blog:', response.data);
                setBlog(response.data);
            } catch (error) {
                console.error("Error occurred while fetching blog", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    const handleUpdate = () => {
        navigate(`/createpost/${slug}`);
    };


    const handleDelete = async () => {
        try {
            if (!blog._id) {
                console.log("Blog Id is missing", blog);
                return;
            }

            console.log("Deleting blog with blogId", blog._id);
            const response = await axios.delete(`http://localhost:5000/api/blogs/${blog._id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            navigate("/blogs");
        } catch (error) {
            console.error("Error deleting blog:", error.response?.data?.message || error.message);
            alert("Failed to delete the blog: " + (error.response?.data?.message || "Please try again."));
        }
    };

    if (loading) return <div className="single-blog-container"><p>Loading...</p></div>;
    if (!blog) return <div className="single-blog-container"><p>Blog not found.</p></div>;

    return (
        <div className="single-blog-container">
            {blog.image && (
                <div className="blog-image-container">
                    <img
                        src={`http://localhost:5000/${blog.image}`}
                        alt={blog.title}
                        className="blog-image"
                    />
                </div>
            )}

            <div className="blog-content-container">
                <h1 className="blog-title">{blog.title}</h1>
                <p className="blog-text">{blog.content}</p>

                {(loggedInUserData?.id === blog.userId || loggedInUserData?.role === "admin") && (
                    <div className="blog-actions">
                        <button className="update-btn" onClick={handleUpdate}>Update</button>
                        <button className="delete-btn" onClick={handleDelete}>Delete</button>


                    </div>
                )}
                <div className='blog-comments'>
                    <CommentSection blogId={blog._id} loggedInUser={loggedInUserData} />
                </div>

            </div>
        </div>
    );
};

export default SingleBlog;