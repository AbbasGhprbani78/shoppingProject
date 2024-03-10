// SearchContext.js
import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);

    const updateSearchResults = (results) => {
        setSearchResults(results);
    };

    return (
        <SearchContext.Provider value={{ searchResults, updateSearchResults }}>
            {children}
        </SearchContext.Provider>
    );
};
