
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';
function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchTVShows() {
            try {
                const response = await axios.get('/search', {
                    params: { q: searchTerm } // Pass searchTerm as a query parameter
                });
                setSearchResult(response.data.result); // Assuming response.data.result contains search results
            } catch (error) {
                console.error('Error fetching TV shows:', error);
                setError('Error fetching TV shows');
            }
        }
        fetchTVShows();
    }, [searchTerm]); // Add searchTerm as a dependency

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/search?q=${searchTerm}`);
            setSearchResult(response.data.result); // Assuming response.data.result contains search results
        } catch (error) {
            console.error('Error searching TV shows:', error);
            setError('Error searching TV shows');
        }
    };

    return (
        <div className="container">
            <div className="title">
                <p>Search Matching TV Series</p>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search TV Shows"
                    className="input"
                />
            </div>
            {error && <p className="error">{error}</p>}
            <ul className="result-list">
                {searchResult.map((show, index) => (
                    <li key={index} className="result-item">{show}</li>
                ))}
            </ul>
        </div>
    );
}

export default Search;
