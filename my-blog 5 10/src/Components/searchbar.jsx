// components/SearchBar.jsx
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onSearch(newQuery); // call parent with search query
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search blogs..."
                value={query}
                onChange={handleInputChange}
                className="p-2 border rounded w-full"
            />
        </div>
    );
};

export default SearchBar;
