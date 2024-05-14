import React from "react";

function SearchBar() {
    return(
        <div className="mt-4">
        <input
            type="text"
            placeholder="Search Here ..."
            className=" ml-5 w-full md:w-64 bg-blue-400 border rounded-2xl px-5 py-2 outline-none text-gray-100 placeholder-gray-100 font-bold"

        />
     </div>
    )

}

export default SearchBar