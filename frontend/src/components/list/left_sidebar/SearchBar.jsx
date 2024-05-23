import React from "react";
import './list.css'; 

function SearchBar() {
    return(
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search Here ..."
                className="search-input"
            />
        </div>
    );
}

export default SearchBar;
