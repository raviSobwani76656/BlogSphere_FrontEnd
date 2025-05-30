import React, { useState, useEffect } from 'react';
import axios from 'axios';


function CategoryCreation({ selectedCategory, setselectedCategory }) {
    const [category, setCategory] = useState([]);


    useEffect(() => {

        const fetchCategories = async () => {

            try {
                const response = await axios.get("http://localhost:5000/api/category/allCategory");
                console.log("Fetched categories:", response.data);
                setCategory(response.data.data)
            }
            catch (error) {
                console.log("Error Occured while fetching the Category", error)
            }
        }

        fetchCategories();

    }, [])


    useEffect(() => {
        console.log("Dropdown received selectedCategory prop:", selectedCategory);
    }, [selectedCategory]);

    return (
        <>
            <label>Select Category:-</label><br />
            <select
                value={selectedCategory}
                onChange={(e) => {
                    console.log("User selected category ID:", e.target.value);
                    setselectedCategory(e.target.value);
                }}
            >

                <option value="">Select the Category</option>
                {Array.isArray(category) && category.length > 0 ? (
                    category.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))
                ) : (
                    <option value="" disabled>No categories available.</option>
                )}
            </select>
        </>

    )
}

export default CategoryCreation;