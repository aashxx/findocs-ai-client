import DocumentCard from "@/components/custom-ui/ai-search/doc-card";
import { FileUpload } from "@/components/ui/file-upload";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthContext } from "@/contexts/AuthContext";
import { PLACEHOLDERS } from "@/lib/constants";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AISearch = () => {

    const { user } = useContext(AuthContext);

    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if(!user) {
            navigate('/login')
        } else if(user?.role === "Accountant") {
            navigate('/');
        }
    }, [user]);

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
        <main className="w-full p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold my-7 text-center">FinDocs AI Search</h2>

            {/* Search Input */}
                <PlaceholdersAndVanishInput 
                    placeholders={PLACEHOLDERS}
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    onSubmit={handleSearch}
                />

            {
                loading || searchResults.length > 0 && (
                    <h2 className="mt-10 text-center font-semibold text-lg">
                        Relevant Docs
                    </h2>
                )
            }

            { loading && (
                <section className="flex gap-2 justify-center my-10">
                    <Skeleton className={'h-[200px] w-[300px] rounded-lg'} />
                    <Skeleton className={'h-[200px] w-[300px] rounded-lg'} />
                    <Skeleton className={'h-[200px] w-[300px] rounded-lg'} />
                </section>
            )}

            {/* Error Message */}
            {error && <p className="text-red-600 mt-2">{error}</p>}

            {/* Display Search Results */}
            <section className="w-[95%] flex flex-wrap gap-2 my-10 justify-center">
                {
                    searchResults.length > 0 && searchResults.map((doc, idx) => (
                        <DocumentCard key={idx} doc={doc} allDocs={false} />
                    ))
                }
                {
                    searchResults.length === 0 && !loading && (
                        <FileUpload />
                    )
                }
            </section>
        </main>
    );
};

export default AISearch;