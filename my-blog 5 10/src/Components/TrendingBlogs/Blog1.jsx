// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Blog1.css';
// import { Link } from 'react-router-dom';
// import SearchBar from "../searchbar";
// import { useLocation } from 'react-router-dom';
// import { getAuthToken } from "../auth";


// const Blog1 = () => {
//     const [blogs, setBlogs] = useState([]);
//     const [query, setQuery] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const location = useLocation();


//     const navigate = useNavigate();
//     const loggedInUserData = JSON.parse(localStorage.getItem("user"));
//     const isAuthenticated = !!localStorage.getItem("token");
//     const isTrending = location.pathname === '/trend/trending';



//     const limit = 8;

//     useEffect(() => {
//         fetchBlogs(currentPage);
//     }, [currentPage]);

//     const fetchBlogs = async (page) => {
//         try {
//             const token = localStorage.getItem("token");
//             let listUrl = `http://localhost:5000/api/allblogs?page=${page}&limit=${limit}`
//             console.log(query.length, " <<squery");

//             if (query.length) {
//                 listUrl = listUrl + `&q=${query}`
//             }
//             setLoading(true);
//             console.log("listUrl >> ", listUrl);

//             const response = await axios.get(listUrl);
//             console.log(response.data.blogs, "response.data.blogs");

//             setBlogs(response.data.blogs);
//             setCurrentPage(response.data.currentPage);
//             setTotalPages(response.data.totalPages);
//             setLoading(false);
//         } catch (error) {
//             console.error("Error occurred while fetching the Blogs", error);
//             setLoading(false);
//         }
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const handleNextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };
//     const handleClick = () => {
//         console.log('Input value:', query);
//     };
//     return (
//         <div style={{ padding: '20px' }} className='card'>

//             {loading ? (
//                 <h1>Loading...</h1>
//             ) : blogs.length === 0 ? (
//                 <h1>No blogs found</h1>
//             ) : (
//                 <div className='grid-container'>
//                     <div className="p-4">
//                         <input
//                             type="text"
//                             value={query}
//                             onChange={(e) => setQuery(e.target.value)}
//                             placeholder="Type something..."
//                             className="border p-2 mr-2 rounded"
//                         />
//                         <button style={{
//                             color: "white", backgroundColor: " #5F4C4C"
//                         }}
//                             onClick={() => fetchBlogs(1)}
//                             className="bg-blue-500 text-white px-4 py-2 rounded"
//                         >
//                             Search
//                         </button>
//                     </div>
//                     {blogs.map((blog) => (
//                         // 
//                         <div
//                             key={blog._id}
//                             className="grid-item"
//                         >
//                             <Link to={`/blog/${blog._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: '20px' }}>
//                                 {blog.image && (
//                                     <div className='image-wrapper'>
//                                         <img
//                                             src={`http://localhost:5000/${blog.image}`}
//                                             alt="Blog"
//                                             className='blog-image'
//                                         />
//                                     </div>
//                                 )}
//                                 <div className='blog-titleAndContent'>
//                                     <h2 className='blog-title'>{blog.title}</h2>
//                                     <p className='blog-content'>{blog.content.substring(0, 600)}...</p>
//                                 </div>
//                             </Link>
//                         </div>


//                     ))}
//                 </div>

//             )
//             }
//             <div style={{ marginTop: '30px', textAlign: 'center' }}>
//                 <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
//                 <span style={{ margin: '0 15px' }}>Page {currentPage} of {totalPages}</span>
//                 <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
//             </div>
//         </div >

//     );
// };

// export default Blog1;
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './Blog1.css';
import CategoriesList from '../blogCategories/blogCategories';

const Blog1 = () => {
    const [blogs, setBlogs] = useState([]);
    const [allFetchedBlogs, setAllFetchedBlogs] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    // Fetch blogs when pathname or selectedCategoryId changes
    useEffect(() => {
        if (location.pathname === '/trend/trending') {
            fetchTrendingBlogs(selectedCategoryId);
        } else {
            fetchBlogs(currentPage, selectedCategoryId);
        }
    }, [location.pathname, selectedCategoryId, currentPage]);

    const fetchTrendingBlogs = async (categoryId) => {
        try {
            setLoading(true);
            let url = 'http://localhost:5000/api/trend/trending';
            if (categoryId) {
                url += `?categoryId=${categoryId}`;
            }
            const response = await axios.get(url);
            setBlogs(response.data.blogs || []);
        } catch (error) {
            console.error('Error fetching trending blogs:', error);
            setBlogs([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchBlogs = async (page, categoryId) => {
        try {
            setLoading(true);
            let url = `http://localhost:5000/api/allblogs?page=${page}`;
            if (categoryId) {
                url += `&categoryId=${categoryId}`;
            }
            const response = await axios.get(url);
            const fetched = response.data.blogs || [];
            setAllFetchedBlogs(fetched);
            setBlogs(fetched);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setBlogs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCategorySelect = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setQuery(''); // Clear search query
        setCurrentPage(1); // Reset to first page
        // Fetch is handled by useEffect, no client-side filtering needed
    };

    const handleSearch = () => {
        if (query.trim()) {
            const filtered = allFetchedBlogs.filter(
                (blog) =>
                    blog.title.toLowerCase().includes(query.toLowerCase()) ||
                    blog.content.toLowerCase().includes(query.toLowerCase())
            );
            setBlogs(filtered);
            setSelectedCategoryId(null); // Clear category filter
            setCurrentPage(1);
        } else {
            setBlogs(allFetchedBlogs);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    // Remove client-side pagination for trending blogs
    const displayBlogs = location.pathname === '/trend/trending' ? blogs : blogs;

    return (
        <div style={{ padding: '20px' }} className='card'>
            {location.pathname !== '/trend/trending' && (
                <div className="p-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search blog..."
                        className="border p-2 mr-2 rounded"
                    />
                    <button
                        onClick={handleSearch}
                        style={{ backgroundColor: '#5F4C4C', color: 'white' }}
                        className="px-4 py-2 rounded"
                    >
                        Search
                    </button>
                </div>
            )}

            <div className='blogListAndCategorySection'>
                <div className='Bloglist-Section'>
                    {loading ? (
                        <h1>Loading...</h1>
                    ) : displayBlogs.length === 0 ? (
                        <h1>No blogs found</h1>
                    ) : (
                        <div className='grid-container'>
                            {displayBlogs.map((blog) => (
                                <div key={blog._id} className="grid-item">
                                    <Link
                                        to={`/blog/${blog.slug}`}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                            display: 'flex',
                                            gap: '20px'
                                        }}
                                    >
                                        {blog.image && (
                                            <div className='image-wrapper'>
                                                <img
                                                    src={`http://localhost:5000/${blog.image}`}
                                                    alt={blog.title || 'Blog image'}
                                                    className='blog-image'
                                                />
                                            </div>
                                        )}
                                        <div className='blog-titleAndContent'>
                                            <h2 className='blog-title'>{blog.title}</h2>
                                            <p className='blog-content'>
                                                {blog.content.substring(0, 600)}...
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className='CategoriesList-Section'>
                    <CategoriesList onCategorySelect={handleCategorySelect} />
                </div>
            </div>

            {location.pathname !== '/trend/trending' && !selectedCategoryId && (
                <div style={{ marginTop: '30px', textAlign: 'center' }}>
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span style={{ margin: '0 15px' }}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

// export default Blog1;

array = [1, 2, 4, 4, 41, 2, 3, 4]


const isDuplicate = (array) => {

    let duplicate = [];


    for (let i = 0; i < array.length; i++) {

        for (let j = i + 1; j < array.length; j++) {


            if (array[i] === array[j] && !duplicate.includes(array[i])) {

                duplicate.push(array[i])

            }


        }


    }
    return duplicate;

}


console.log(isDuplicate([1, 3, 3, 4, 4, 5, 5, 6]))




class bag {


    constructor(price, type) {
        this.price = price,
            this.type = type
    }

    b1 = () =>console.log(`${this.price} is the price of the bag`)


}  