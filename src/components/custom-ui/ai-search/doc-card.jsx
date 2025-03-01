import { FileText } from 'lucide-react';
import React from 'react';

const DocumentCard = ({ doc, allDocs }) => {

    const formatFirestoreDate = (timestamp) => {
        if (!timestamp) return "Unknown Date";
        return timestamp.toDate().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <a target='blank' href={doc.file_url}>
            <article className="max-w-[300px] w-[300px] rounded-lg h-[200px] border shadowmd hover:shadow-lg hover:cursor-pointer transition-all duration-300 ease-in">
                <div className='h-[65%] rounded-t-lg flex items-center bg-[whitesmoke] justify-center'>
                    <FileText className='text-[gray] h-[50px] w-[50px]' />
                </div>
                <aside className='h-[35%] rounded-b-lg py-2 px-3 relative'>
                    <h2 className='text-ellipsis overflow-hidden whitespace-nowrap'>
                        {doc.name}
                    </h2>
                    <div className='flex justify-between items-center text-sm text-[gray] mt-3'>
                        {
                            allDocs ? (
                                <p>
                                    {formatFirestoreDate(doc.uploaded_at)}
                                </p>
                            ): (
                                <p>
                                    Relevance: {doc.similarity ? doc.similarity.toFixed(2)*100 + "%" : "N/A"}
                                </p>
                            )
                        }
                        <p>
                            {doc.type || "Unknown"}
                        </p>
                    </div>
                </aside>
            </article>
        </a>
    )
}

export default DocumentCard;
