
// import "../App.css";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState, useRef } from "react";
// import ImageUploader from "../Components/ImageUploader.jsx";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function PostcreatorForm() {
//     const params = useParams();
//     const navigate = useNavigate();
//     const [token, setToken] = useState(null);
//     const [imageFilename, setImageFilename] = useState(null);
//     const toastId = useRef(null); // Ref to track active toast

//     const schema = yup.object().shape({
//         title: yup.string().required("Title is mandatory").min(5).max(300),
//         content: yup
//             .string()
//             .required("Content is mandatory for the creation of the post")
//             .min(40, "Content should be more than 40 characters")
//             .max(5000, "Content should be less than 5000 characters"),
//     });

//     const {
//         register,
//         setValue,
//         handleSubmit,
//         formState: { errors }
//     } = useForm({ resolver: yupResolver(schema) });

//     useEffect(() => {
//         const storedToken = localStorage.getItem("token");
//         setToken(storedToken);

//         return () => {
//             // Clean up any active toasts when component unmounts
//             if (toastId.current) {
//                 toast.dismiss(toastId.current);
//             }
//         };
//     }, []);

//     useEffect(() => {
//         if (params.id !== "null") {
//             const fetchBlog = async () => {
//                 try {
//                     const response = await axios.get(`http://localhost:5000/api/${params.id}`);
//                     const blog = response.data?.blog;
//                     if (blog) {
//                         setValue("title", blog.title);
//                         setValue("content", blog.content);
//                         setImageFilename(blog.image);
//                     }
//                 } catch (error) {
//                     toastId.current = toast.error("Failed to fetch blog data.");
//                     console.error("Error fetching blog:", error);
//                 }
//             };
//             fetchBlog();
//         }
//     }, [params.id, setValue]);

//     const onSubmit = async (data) => {
//         try {
//             let response;

//             if (params.id !== "null") {
//                 response = await axios.put(`http://localhost:5000/api/${params.id}`, {
//                     ...data,
//                     image: imageFilename,
//                 }, {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 toastId.current = toast.success("Blog Updated Successfully!", {
//                     onClose: () => navigate("/blogs")
//                 });
//             } else {
//                 console.log("hello");

//                 if (!imageFilename) {
//                     toastId.current = toast.error("Please upload an image.");
//                     return;
//                 }

//                 let reqData = {
//                     title: data.title,
//                     content: data.content,
//                     image: imageFilename
//                 }
//                 response = await axios.post("http://localhost:5000/api/create", reqData, {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 toastId.current = toast.success("Blog Created Successfully!", {
//                     onClose: () => navigate("/blogs")
//                 });
//             }
//         } catch (error) {
//             toastId.current = toast.error("Something went wrong while saving the blog.");
//             console.error("Error while creating/updating blog:", error?.response?.data || error.message);
//         }
//     };

//     const handleImageSelect = (filename) => {
//         console.log(filename, " <<filename");

//         setImageFilename(filename);
//     };

//     return (
//         <div className="post-form-container">
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <ImageUploader onSelectFile={handleImageSelect} />

//                 <div>
//                     <label>Title</label><br />
//                     <input placeholder="Enter the title" {...register("title")} />
//                     <p>{errors.title?.message}</p>
//                 </div>

//                 <div>
//                     <label>Content</label><br />
//                     <textarea
//                         placeholder="Enter the content of the blog..."
//                         rows={10}
//                         cols={50}
//                         {...register("content")}
//                     />
//                     <p>{errors.content?.message}</p>
//                 </div>

//                 <button style={{ color: "white", backgroundColor: "black" }} type="submit">
//                     {params.id !== "null" ? "Update Post" : "Create Post"}
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default PostcreatorForm;

// import "../App.css";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import ImageUploader from "../Components/ImageUploader.jsx";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import CategoryCreation from '../CategoryCreation.jsx';

// function PostcreatorForm() {
//     const params = useParams();
//     const navigate = useNavigate();
//     const [token, setToken] = useState(null);
//     const [imageFilename, setImageFilename] = useState(null);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [blogId, setBlogId] = useState(null);

//     const schema = yup.object().shape({
//         title: yup.string().required("Title is mandatory").min(5).max(300),
//         content: yup
//             .string()
//             .required("Content is mandatory for the creation of the post")
//             .min(40, "Content should be more than 40 characters")
//             .max(5000, "Content should be less than 5000 characters"),
//     });

//     const {
//         register,
//         setValue,
//         handleSubmit,
//         formState: { errors }
//     } = useForm({ resolver: yupResolver(schema) });

//     useEffect(() => {
//         const storedToken = localStorage.getItem("token");
//         setToken(storedToken);
//     }, []);

//     useEffect(() => {
//         if (params.slug !== "null") {
//             const fetchBlog = async () => {
//                 try {
//                     const response = await axios.get(`http://localhost:5000/api/${params.slug}`);
//                     const blog = response.data;
//                     if (blog) {
//                         setValue("title", blog.title);
//                         setValue("content", blog.content);
//                         setImageFilename(blog.image);
//                         setBlogId(blog._id); // ✅ store blog ID
//                     }
//                 } catch (error) {
//                     toast.error("Failed to fetch blog data.");
//                     console.error("Error fetching blog:", error);
//                 }
//             };
//             fetchBlog();
//         }
//     }, [params.slug, setValue]);

//     const handleFileSelect = (file) => {
//         setSelectedFile(file);
//     };

//     const uploadImage = async (file) => {
//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post('http://localhost:5000/api/upload/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             if (response.status === 200 && response.data?.file?.path) {
//                 return response.data.file.path;
//             } else {
//                 throw new Error('Unexpected response from server.');
//             }
//         } catch (error) {
//             throw new Error(error.response?.data?.message || 'Error uploading the file.');
//         }
//     };

//     const onSubmit = async (data) => {
//         if (isSubmitting) return;
//         setIsSubmitting(true);

//         try {
//             let newImageFilename = imageFilename;

//             // Upload image if a new file is selected
//             if (selectedFile) {
//                 newImageFilename = await uploadImage(selectedFile);
//                 setImageFilename(newImageFilename);
//             }

//             // Validate image for new posts
//             if (params.slug === "null" && !newImageFilename) {
//                 toast.error("Please upload an image.");
//                 setIsSubmitting(false);
//                 return;
//             }

//             let response;
//             const reqData = {
//                 title: data.title,
//                 content: data.content,
//                 image: newImageFilename,
//                 categoryId: selectedCategory
//             };

//             if (params.slug !== "null") {
//                 // Update existing post
//                 response = await axios.put(`http://localhost:5000/api/${blogId}`, reqData, {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 toast.success("Blog Updated Successfully!", {
//                     autoClose: 3000, // Increased time for toast visibility
//                 });
//             } else {
//                 // Create new post
//                 response = await axios.post("http://localhost:5000/api/create", reqData, {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 toast.success("Blog Created Successfully!", {
//                     autoClose: 3000, // Increased time for toast visibility
//                 });
//             }

//             // Delay navigation after the toast is shown
//             setTimeout(() => {
//                 navigate("/blogs");
//             }, 3000); // Increased timeout to match toast duration

//         } catch (error) {
//             toast.error(error.message || "Something went wrong while saving the blog.");
//             console.error("Error while creating/updating blog:", error?.response?.data || error.message);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="post-form-container">
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <ImageUploader onFileSelect={handleFileSelect} />
//                 {imageFilename && (
//                     <p>Selected image: {imageFilename.split('/').pop()}</p>
//                 )}
//                 <br />

//                 <div>
//                     <CategoryCreation
//                         selectedCategory={selectedCategory}
//                         setselectedCategory={setSelectedCategory}
//                     />
//                 </div>
//                 <br />
//                 <div>
//                     <label>Title</label><br />
//                     <input placeholder="Enter the title" {...register("title")} />
//                     <p>{errors.title?.message}</p>
//                 </div>

//                 <div>
//                     <label>Content</label><br />
//                     <textarea
//                         placeholder="Enter the content of the blog..."
//                         rows={10}
//                         cols={50}
//                         {...register("content")}
//                     />
//                     <p>{errors.content?.message}</p>
//                 </div>

//                 <button
//                     style={{ color: "white", backgroundColor: "black" }}
//                     type="submit"
//                     disabled={isSubmitting}
//                 >
//                     {isSubmitting
//                         ? "Processing..."
//                         : params.slug !== "null"
//                             ? "Update Post"
//                             : "Create Post"}
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default PostcreatorForm;



import "../App.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageUploader from "../Components/ImageUploader.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryCreation from '../CategoryCreation.jsx';

function PostcreatorForm() {
    const params = useParams();
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [imageFilename, setImageFilename] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [blogId, setBlogId] = useState(null);

    const schema = yup.object().shape({
        title: yup.string().required("Title is mandatory").min(5).max(300),
        content: yup
            .string()
            .required("Content is mandatory for the creation of the post")
            .min(40, "Content should be more than 40 characters")
            .max(5000, "Content should be less than 5000 characters"),
    });

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, []);

    useEffect(() => {
        if (params.slug !== "null") {
            const fetchBlog = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/${params.slug}`);
                    const blog = response.data;
                    if (blog) {
                        console.log(blog);

                        setValue("title", blog.title);
                        setValue("content", blog.content);
                        setImageFilename(blog.image);
                        setBlogId(blog._id);

                        setSelectedCategory(blog.categoryId);

                        console.log(" Pre Filled Category", blog.categoryId)

                    }
                } catch (error) {
                    toast.error("Failed to fetch blog data.");
                    console.error("Error fetching blog:", error);
                }
            };
            fetchBlog();
        }
    }, [params.slug, setValue]);

    const handleFileSelect = async (file) => {
        setSelectedFile(file);
        try {
            const uploadedImageUrl = await uploadImage(file); // Upload image immediately
            console.log(uploadedImageUrl);
            setImageFilename(uploadedImageUrl); // Update the image state to show the new image
        } catch (error) {
            toast.error("Error uploading image");
            console.error("Error while uploading image:", error);
        }
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            console.log("Submitting post with categoryId:", selectedCategory);
            const response = await axios.post('http://localhost:5000/api/upload/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200 && response.data?.file?.path) {
                return response.data.file.path;
            } else {
                throw new Error('Unexpected response from server.');
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error uploading the file.');
        }
    };

    const onSubmit = async (data) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            let newImageFilename = imageFilename;

            // Validate image for new posts
            if (params.slug === "null" && !newImageFilename) {
                toast.error("Please upload an image.");
                setIsSubmitting(false);
                return;
            }

            let response;
            const reqData = {
                title: data.title,
                content: data.content,
                image: newImageFilename,
                categoryId: selectedCategory
            };

            if (params.slug !== "null") {
                console.log("Submitting post with categoryId:", selectedCategory);
                // Update existing post
                response = await axios.put(`http://localhost:5000/api/${blogId}`, reqData, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                toast.success("Blog Updated Successfully!");
            } else {
                // Create new post
                console.log("Submitting post with categoryId:", selectedCategory);


                response = await axios.post("http://localhost:5000/api/create", reqData, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                toast.success("Blog Created Successfully!", {
                    autoClose: 3000, // Increased time for toast visibility
                });
            }

            // Delay navigation after the toast is shown
            setTimeout(() => {
                navigate("/blogs");
            }, 3000); // Increased timeout to match toast duration

        } catch (error) {
            toast.error(error.message || "Something went wrong while saving the blog.");
            console.error("Error while creating/updating blog:", error?.response?.data || error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="post-form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <ImageUploader onFileSelect={handleFileSelect} />

                {/* Display current image if updating */}
                {imageFilename && (
                    <div>
                        <img
                            src={`http://localhost:5000/${imageFilename}`}
                            alt="Blog Image"
                            style={{ width: '100px', height: 'auto', marginBottom: '10px' }}
                        />

                    </div>
                )}

                <br />

                {/* Category Creation */}
                <div>
                    <CategoryCreation
                        selectedCategory={selectedCategory}
                        setselectedCategory={setSelectedCategory}

                    />
                </div>
                <br />

                <div>
                    <label>Title</label><br />
                    <input placeholder="Enter the title" {...register("title")} />
                    <p>{errors.title?.message}</p>
                </div>

                <div>

                    {/* <button onClick={() => toast.success("Toast is working!")}>Test Toast</button> */}
                    <label>Content</label><br />
                    <textarea
                        placeholder="Enter the content of the blog..."
                        rows={10}
                        cols={50}
                        {...register("content")}
                    />
                    <p>{errors.content?.message}</p>
                </div>

                <button
                    style={{ color: "white", backgroundColor: "black" }}
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Processing..."
                        : params.slug !== "null"
                            ? "Update Post"
                            : "Create Post"}
                </button>
            </form>
        </div>
    );
}

export default PostcreatorForm;


