import { Button } from '@/components/ui/button';
import { CloudUpload, Search } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocsContext } from '@/contexts/DocsContext';
import DocumentCard from '@/components/custom-ui/ai-search/doc-card';

const AllDocuments = () => {
  const { docs } = useContext(DocsContext);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Extract unique document types
  const types = Array.from(new Set(docs.map(doc => doc.type)));

  // Filter documents based on search query (case insensitive)
  const filteredDocs = docs.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className='w-full min-h-screen p-10'>
      
      {/* Header Section */}
      <section className="mb-6 flex items-center justify-between w-full">
        <h2 className="font-semibold text-2xl text-gray-800">
          All Documents
        </h2>
        <Link to={'/upload'}>
          <Button>
            <CloudUpload className="mr-2"/>
            Upload Document
          </Button>
        </Link>
      </section>

      {/* Tabs for Document Categories */}
      <section>
        <Tabs defaultValue={"All"} className="w-full">
          <section className='flex items-center justify-between'>
            <TabsList>
              <TabsTrigger value={"All"}>All</TabsTrigger>
              {types.map((type, idx) => (
                <TabsTrigger key={idx} value={type}>{type}</TabsTrigger>
              ))}
            </TabsList>
            <div className="flex items-center border border-gray-300 rounded-md p-2 w-full max-w-md">
              <Search className="text-gray-500" />
              <input
                type="text"
                placeholder="Search by file name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full ml-2 outline-none"
              />
            </div>
          </section>

          {/* Show all docs matching the search query */}
          <TabsContent value={"All"}>
            <div className="mt-10 flex gap-3 flex-wrap">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc, idx) => (
                  <DocumentCard key={idx} doc={doc} allDocs={true} />
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-full">No matching documents found.</p>
              )}
            </div>
          </TabsContent>

          {/* Tabs based on document type */}
          {types.map((type, idx) => (
            <TabsContent key={idx} value={type}>
              <div className="flex gap-3 flex-wrap mt-10">
                {filteredDocs.filter(doc => doc.type === type).length > 0 ? (
                  filteredDocs.filter(doc => doc.type === type).map((doc, idx) => (
                    <DocumentCard key={idx} doc={doc} allDocs={true} />
                  ))
                ) : (
                  <p className="text-gray-500 text-center col-span-full">No documents found for "{type}".</p>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
      
    </main>
  );
};

export default AllDocuments;