import React, { useState } from "react";
import axios from "axios";
import "./../assets/styles/SearchComponent.css";

const SearchComponent = ({ entity, onSearchResults }) => {
    const [title, setTitle] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3004/api/search/${entity}`, {
                params: {
                    title,
                }
            });
            // Pass results to parent component (Dashboard) through the prop
            onSearchResults(response.data);
        }
        catch (err) {
            console.log("Search Failed:", err);
        }
    };

    return (
        <div className="search-container">
            <h2>Search {entity}</h2>
            <form className="search-form" onSubmit={handleSearch}>
                <input 
                    className="search-input" 
                    type="text" 
                    placeholder={`Search ${entity}...`} 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <button className="search-button" type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchComponent;
