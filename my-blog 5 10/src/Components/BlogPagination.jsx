// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const BlogPagination = () => {
//     const [blogs, setBlogs] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [loading, setLoading] = useState(false);

//     const limit = 9; // Number of blogs per page

//     // Fetch blogs based on current page
//     const fetchPaginatedBlogs = async (page) => {
//         console.log(`Calling: http://localhost:5000/api/paginated/blogs?page=${page}&limit=${limit}`);
//         try {
//             setLoading(true);
//             const response = await axios.get(`http://localhost:5000/api/paginated/blogs?page=${page}&limit=${limit}`);

//             setBlogs(response.data.blogs);
//             setCurrentPage(response.data.currentPage);
//             setTotalPages(response.data.totalPages);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching paginated blogs:', error);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPaginatedBlogs(currentPage);
//     }, [currentPage]);

//     // Handle pagination
//     const handlePrev = () => {
//         if (currentPage > 1) setCurrentPage(currentPage - 1);
//     };

//     const handleNext = () => {
//         if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <h2>Paginated Blogs</h2>

//             {loading ? (
//                 <p>Loading blogs...</p>
//             ) : (
//                 blogs.map((blog, index) => (
//                     <div key={index} style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '15px', borderRadius: '5px' }}>
//                         <h3>{blog.title}</h3>
//                         <p>{blog.content}</p>
//                         {blog.image && (
//                             <img src={`http://localhost:5000/uploads/${blog.image}`} alt="Blog" style={{ width: '100%', maxWidth: '400px' }} />
//                         )}
//                     </div>
//                 ))
//             )}

//             {/* Pagination controls */}
//             <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
//                 <button onClick={handlePrev} disabled={currentPage === 1}>
//                     Prev
//                 </button>
//                 <span>Page {currentPage} of {totalPages}</span>
//                 <button onClick={handleNext} disabled={currentPage === totalPages}>
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default BlogPagination;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogPagination = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const limit = 10; // Number of blogs per page

    // Fetch blogs based on current page
    const fetchPaginatedBlogs = async (page) => {
        console.log(`Calling: http://localhost:5000/api/paginated/blogs?page=${page}&limit=${limit}`);
        try {
            setLoading(true);
            console.log('Limit in Frontend:', limit);
            const response = await axios.get(`http://localhost:5000/api/paginated/blogs?page=${page}&limit=${limit}`);

            setBlogs(response.data.blogs);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching paginated blogs:', error);
            setLoading(false);
        }
    };

    // Fetch blogs on initial load and when page changes
    useEffect(() => {
        fetchPaginatedBlogs(currentPage);
    }, [currentPage]);

    // Handle pagination
    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Paginated Blogs</h2>

            {loading ? (
                <p>Loading blogs...</p>
            ) : (
                blogs.map((blog, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '15px', borderRadius: '5px' }}>
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                        {blog.image && (
                            <img
                                src={`http://localhost:5000/uploads/${blog.image}`}
                                alt="Blog"
                                style={{ width: '100%', maxWidth: '400px' }}
                            />
                        )}
                    </div>
                ))
            )}

            {/* Pagination controls */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
                <button onClick={handlePrev} disabled={currentPage === 1}>
                    Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNext} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default BlogPagination;
