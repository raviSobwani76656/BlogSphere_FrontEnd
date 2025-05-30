// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const FileUploader = ({ handleFile }) => {
// //     const [file, setFile] = useState(null); // stores the file
// //     const [message, setMessage] = useState(""); // feedback to user

// //     // 1. Capture file on change
// //     const handleFileChange = (e) => {
// //         setFile(e.target.files[0]);
// //     };

// //     // 2. Upload file to backend
// //     const handleUpload = async () => {
// //         if (!file) {
// //             setMessage("Please select a file first!");
// //             return;
// //         }

// //         handleFile(file);

// //         const formData = new FormData();
// //         formData.append("myFile", file);

// //         try {
// //             const response = await axios.post("http://localhost:5000/upload", formData, {
// //                 headers: {
// //                     "Content-Type": "multipart/form-data"
// //                 }
// //             });

// //             setMessage("Upload successful");
// //             console.log(response.data);
// //         } catch (err) {
// //             console.error("Upload failed ", err);
// //             setMessage("Upload failed. Please try again.");
// //         }
// //     };

// //     // ✅ return must be inside the function
// //     return (
// //         <div style={{ padding: '20px' }}>
// //             <h2>Upload a File</h2>
// //             <input type="file" onChange={handleFileChange} />
// //             <button onClick={handleUpload}>Upload</button>
// //             <p>{message}</p>
// //         </div>
// //     );
// // };

// // export default FileUploader;
















// import React from 'react';

// const FileUploader = ({ handleFile }) => {
//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         handleFile(selectedFile); // pass the file up to parent
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <h3>Upload Image</h3>
//             <input type="file" onChange={handleFileChange} />
//         </div>
//     );
// };

// export default FileUploader;


import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = ({ onUploadSuccess }) => {
    const [image, setImage] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');

    const handleChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!image) {
            return setUploadMessage('Please select an image first.');
        }

        const formData = new FormData();
        formData.append('myFile', image);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setUploadMessage('Image uploaded successfully!');
            onUploadSuccess(res.data.file); // Pass uploaded file info to parent

        } catch (err) {
            console.error('Upload failed:', err);
            setUploadMessage('Image upload failed. Please try again.');
        }
    };

    return (
        <div>
            <label>Upload Image:</label><br />
            <input type="file" accept="image/*" onChange={handleChange} />
            <button type="button" onClick={handleUpload} style={{ marginLeft: '10px' }}>
                Upload
            </button>
            {uploadMessage && <p style={{ color: 'green', marginTop: '5px' }}>{uploadMessage}</p>}
        </div>
    );
};

export default ImageUploader;

