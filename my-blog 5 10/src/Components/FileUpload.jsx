// import { useState } from "react";
// import axios from 'axios';

// const FileUpload = () => {

//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleChange = (e) => {

//         setSelectedFile(e.target.files[0]);

//     }
//     const handleSubmit = async () => {
//         try {
//             const formData = new FormData();

//             formData.append("file", selectedFile);
//             await axios.post('http://localhost:3001/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             console.log('File uploaded successfully');

//         } catch (error) {
//             console.log("Error Occured", error)
//         }

//     }
//     return (
//         <div>

//             <input type="file" onChange={handleChange}></input>
//             <button onClick={handleSubmit}></button>

//         </div>

//     )
// }


import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FileUpload({ onFileUploadSuccess }) {
    const [file, setFile] = useState(null); // State to hold the file

    // Handle file selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile); // Set the selected file
        }
    };

    // Handle file upload
    const handleUpload = async () => {
        if (!file) {
            toast.error('Please select a file to upload!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file); // Append file to form data

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                toast.success('File uploaded successfully!');
                // Notify parent component of successful upload
                onFileUploadSuccess(response.data.filename); // Send the filename back to parent
            }
        } catch (error) {
            toast.error('Error uploading the file.');
            console.error('Upload error:', error);
        }
    };

    return (
        <div>
            <h1>Upload Blog Image</h1>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <button onClick={handleUpload} disabled={!file}>
                Upload Image
            </button>

            <ToastContainer />
        </div>
    );
}

export default FileUpload;
