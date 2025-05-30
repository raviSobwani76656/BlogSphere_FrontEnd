// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function ImageUploader({ onSelectFile }) {
//     const [file, setFile] = useState(null);

//     const handleFileChange = (event) => {
//         const selectedFile = event.target.files[0];
//         if (selectedFile) {
//             setFile(selectedFile);
//         }
//     };

//     const handleUpload = async () => {
//         if (!file) {
//             toast.error('Please select a file to upload!');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post('http://localhost:5000/api/upload/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             if (response.status === 200 && response.data?.filename) {
//                 toast.success('File uploaded successfully!');
//                 onSelectFile(response.data.filename); // Notify parent with filename
//             }
//         } catch (error) {
//             toast.error('Error uploading the file.');
//             console.error('Upload error:', error);
//         }
//     };

//     return (
//         <div>
//             <h3>Upload Blog Image</h3>
//             <input type="file" onChange={handleFileChange} accept="image/*" />
//             <button onClick={handleUpload} disabled={!file}>
//                 Upload Image
//             </button>
//             <ToastContainer />
//         </div>
//     );
// }

// export default ImageUploader;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function ImageUploader({ onSelectFile }) {
//     const [file, setFile] = useState(null);

//     useEffect(() => {
//         return () => toast.dismiss(); // Cleanup toasts on unmount
//     }, []);

//     const handleFileChange = (event) => {
//         const selectedFile = event.target.files[0];
//         if (selectedFile) {
//             setFile(selectedFile);
//         }
//     };

//     const handleUpload = async () => {
//         if (!file) {
//             toast.error('Please select a file to upload!');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post('http://localhost:5000/api/upload/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             if (response.status === 200 && response.data?.file) {
//                 console.log(response.data?.file, "res <<<");

//                 toast.success('File uploaded successfully!');
//                 onSelectFile(response.data.file.path); // Safe call
//             }
//         } catch (error) {
//             toast.error('Error uploading the file.');
//             console.error('Upload error:', error);
//         }
//     };

//     return (

//         <div>
//             <h3>Upload Blog Image</h3>
//             <input type="file" onChange={handleFileChange} accept="image/*" />
//             <button style={{ backgroundColor: "black", color: "white" }} onClick={handleUpload} disabled={!file}>
//                 Upload Image
//             </button>
//             {/* REMOVE <ToastContainer /> HERE */}
//         </div>
//     );
// }

// export default ImageUploader;


import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ImageUploader({ onFileSelect }) {
    const [file, setFile] = useState(null);

    useEffect(() => {
        return () => toast.dismiss(); // Cleanup toasts on unmount
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        console.log(selectedFile, "  setImageFilename(uploadedImageUrl);");

        if (selectedFile) {
            if (!selectedFile.type.startsWith('image/')) {
                toast.error('Please select an image file!');
                setFile(null);
                onFileSelect(null);
                return;
            }
            if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error('File size exceeds 5MB!');
                setFile(null);
                onFileSelect(null);
                return;
            }
            setFile(selectedFile);
            onFileSelect(selectedFile); // Pass file to parent
        } else {
            setFile(null);
            onFileSelect(null);
        }
    };

    return (
        <div>
            <p>Upload Blog Image</p>
            <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                aria-label="Select an image to upload"
            />
        </div>
    );
}

export default ImageUploader;