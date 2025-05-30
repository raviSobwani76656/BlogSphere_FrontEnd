import React, { useState, useEffect } from "react";
import axios from "axios";


function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const limit = 8;

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:3555/api/allblogs", {
                    params: {
                        q: query,
                        page: currentPage,
                        limit: limit,
                    },
                });

                setBlogs(response.data.blogs);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching blogs", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [query, currentPage]);

    const handleSearch = () => {
        setCurrentPage(1);
        setQuery(searchTerm);
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="blog-container">
            <div className="search-bar">
                <input
                    type="text"
                    value={searchTerm}
                    placeholder="Search blogs..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>🔍</button>
            </div>

            {loading ? (
                <p>Loading blogs...</p>
            ) : (
                <div className="blog-list">
                    {blogs.length === 0 ? (
                        <p>No blogs found.</p>
                    ) : (
                        blogs.map((blog) => (
                            <div key={blog._id} className="blog-card">
                                <h3>{blog.title}</h3>
                                <p>{blog.content.substring(0, 600)}...</p>
                            </div>
                        ))
                    )}
                </div>
            )}

            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default BlogList;
