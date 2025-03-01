import React, { useState } from "react";

const AISearch = () => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setError("");
        setSearchResults([]); // Clear previous results
        
        try {
            const encodedQuery = encodeURIComponent(query); 
            const response = await fetch(`http://127.0.0.1:8000/api/search/?query=${encodedQuery}`);

            if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

            const data = await response.json();
            setSearchResults(data.results || []);
        } catch (error) {
            console.error("Search Error:", error);
            setError("Failed to fetch search results.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">🔍 AI Document Search</h2>

            {/* Search Input */}
            <div className="flex space-x-2">
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Search documents..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Pressing Enter triggers search
                    autoFocus // Automatically focuses input field
                />
                <button 
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                    disabled={loading}
                >
                    {loading ? <span className="animate-spin">🔄</span> : "Search"}
                </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600 mt-2">{error}</p>}

            {/* Display Search Results */}
            {searchResults.length > 0 ? (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold">📄 Results:</h3>
                    <ul className="mt-2 space-y-2">
                        {searchResults.map((doc, index) => (
                            <li key={index} className="p-3 bg-gray-100 border rounded-md">
                                <p><strong>📄 Document:</strong> {doc.text}</p>
                                <p><strong>📌 Type:</strong> {doc.type || "Unknown"}</p>
                                <p><strong>🏷 Tags:</strong> {JSON.stringify(doc.tags || {})}</p>
                                <p><strong>🔍 Relevance:</strong> {doc.similarity ? doc.similarity.toFixed(2) : "N/A"}</p>
                                {doc.file_url && (
                                    <a 
                                        href={doc.file_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        View Document
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                !loading && !error && (
                    <p className="text-gray-500 mt-4">No results found. Try a different search term.</p>
                )
            )}
        </div>
    );
};

export default AISearch;