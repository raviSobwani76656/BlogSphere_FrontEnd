import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './blogCategories.css'


const CategoriesList = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/category/allCategory");
                setCategories(res.data.data || []);
            } catch (err) {
                setError("Failed to load categories.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <p>Loading categories...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            {categories.length === 0 ? (
                <p>No categories found.</p>
            ) : (

                <div className="CategoryList ">
                    <button
                        onClick={() => onCategorySelect(null)}
                        className="allButton"
                    >
                        All
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category._id}
                            onClick={() => onCategorySelect(category._id)}
                            className="categoriesButton"
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoriesList;