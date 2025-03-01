import React, { useContext, useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Upload } from "lucide-react";
import { storage } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";

const UploadDocuments = () => {

    const { user } = useContext(AuthContext);

    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState({});
    const [fileDetails, setFileDetails] = useState({});
    const [uploading, setUploading] = useState(false);
    const statusMessages = [
        "Extracting text...", 
        "Classifying document...", 
        "Uploading tags...", 
        "Finishing..."
    ];

    const navigate = useNavigate();
    
    useEffect(() => {
        if(!user) {
            navigate('/login')
        } else if(user?.role !== "Accountant") {
            navigate('/');
        }
    }, [user]);

    const handleFileUpload = async (selectedFiles) => {
        setFiles(selectedFiles);
        setUploading(true);
        for (const file of selectedFiles) {
            await uploadFile(file);
        }
        setUploading(false);
    };

    const uploadFile = (file) => {
        return new Promise((resolve, reject) => {
            const storageRef = ref(storage, `docs/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progressPercentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress((prev) => ({ ...prev, [file.name]: progressPercentage }));
                },
                (error) => {
                    console.error("Upload Error:", error);
                    alert("Upload failed!");
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    const response = await processFile(file, downloadURL);
                    if (response) {
                        setFileDetails((prev) => ({ ...prev, [file.name]: response }));
                    }
                    setProgress((prev) => ({ ...prev, [file.name]: "Uploaded" }));
                    resolve();
                }
            );
        });
    };

    const processFile = async (file, downloadURL) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/upload/", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            const docRef = doc(collection(db, "documents"), file.name);
            await setDoc(docRef, {
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(2),
                type: data.document_type,
                extracted_text: data.extracted_text,
                tags: data.tags,
                embeddings: data.embeddings,
                file_url: downloadURL,
                uploaded_at: serverTimestamp(),
            });

            return {
                name: file.name,
                type: data.document_type,
                tags: data.tags,
                embeddings: data.embeddings,
            };
        } catch (error) {
            console.error("Processing Error:", error);
            return null;
        }
    };

    return (
        <main className="w-full min-h-screen bg-gray-50 p-10 flex flex-col items-center">
            <section className="mb-6">
                <h2 className="font-semibold text-3xl text-gray-800">Upload Your Documents</h2>
                <p className="text-gray-500 mt-2">Securely upload and process your documents</p>
            </section>
            
            <section className={cn("w-full max-w-xl p-6 bg-white rounded-xl shadow-lg border flex flex-col items-center justify-center transition-all", uploading && "opacity-50 cursor-not-allowed") }>
                <label className="cursor-pointer flex flex-col items-center w-full">
                    <Upload className="w-16 h-16 text-gray-400 mb-3" />
                    <span className="text-lg font-medium">Drag & Drop or Click to Upload</span>
                    <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={(e) => handleFileUpload(Array.from(e.target.files))}
                        disabled={uploading}
                    />
                </label>
            </section>
            
            {Object.keys(progress).length > 0 && (
                <div className="mt-10 w-full max-w-xl text-center">
                    {files.map((file) => (
                        <div key={file.name} className="mb-4">
                            <aside className="flex items-center justify-between">
                                <p className={`text-sm font-medium text-gray-700 ${progress[file.name] !== "Uploaded" && 'text-center'}`}>{file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</p>
                                {progress[file.name] === "Uploaded" && (
                                    <p className="text-green-600 font-semibold text-sm bg-green-100 px-2 py-1 rounded-md">Uploaded</p>
                                )}
                            </aside>
                            {progress[file.name] !== "Uploaded" && (
                                <>
                                    <aside className="flex gap-2 items-center justify-center">  
                                        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                                            <div
                                                className="bg-blue-600 h-3 rounded-full transition-all duration-200"
                                                style={{ width: `${progress[file.name] || 0}%` }}
                                            />
                                        </div>
                                    </aside>
                                    <p className="text-xs text-gray-700">{progress[file.name] || 0}%</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {statusMessages[Math.min(Math.floor((progress[file.name] / 100) * statusMessages.length), statusMessages.length - 1)]}
                                    </p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default UploadDocuments;