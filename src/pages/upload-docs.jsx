import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { Upload, X } from "lucide-react";
import { storage } from "@/lib/firebase"; // Firebase Storage
import { db } from "@/lib/firebase"; // Firestore DB

const UploadDocuments = () => {
    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState({});
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [fileDetails, setFileDetails] = useState({});

    const handleFileUpload = async (selectedFiles) => {
        setFiles(selectedFiles);
        for (const file of selectedFiles) {
            await uploadFile(file);
        }
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
                    setUploadedFiles((prev) => [...prev, { name: file.name, url: downloadURL }]);

                    // ✅ Send file to backend for processing
                    const response = await processFile(file, downloadURL);
                    if (response) {
                        setFileDetails((prev) => ({ ...prev, [file.name]: response }));
                    }

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
            console.log("Processed Data:", data);

            // ✅ Store OCR, metadata, and embeddings in Firestore
            const docRef = doc(collection(db, "documents"), file.name);
            await setDoc(docRef, {
                name: file.name,
                type: data.document_type,
                extracted_text: data.extracted_text,
                tags: data.tags,
                embeddings: data.embeddings,  // ✅ Storing embeddings
                file_url: downloadURL,
                uploaded_at: serverTimestamp(),
            });

            return {
                name: file.name,
                type: data.document_type,
                tags: data.tags,
                embeddings: data.embeddings,  // ✅ Pass embeddings
            };
        } catch (error) {
            console.error("Processing Error:", error);
            return null;
        }
    };

    const deleteFile = async (fileName) => {
        try {
            const fileRef = ref(storage, `docs/${fileName}`);
            await deleteObject(fileRef);
            setUploadedFiles((prev) => prev.filter((file) => file.name !== fileName));
            setFileDetails((prev) => {
                const newDetails = { ...prev };
                delete newDetails[fileName];
                return newDetails;
            });

            // ✅ Delete document from Firestore
            await deleteDoc(doc(db, "documents", fileName));

            alert("File deleted successfully!");
        } catch (error) {
            console.error("Error deleting file:", error);
            alert("Failed to delete file.");
        }
    };

    return (
        <main className="w-full min-h-screen bg-gray-100 p-10">
            <section className="mb-6">
                <h2 className="font-semibold text-2xl text-gray-800">Upload Documents</h2>
            </section>

            <section className="w-full mx-auto p-6 bg-white rounded-lg flex flex-col items-center justify-center border border-dashed border-gray-300 hover:bg-gray-50 transition">
                <label className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-14 h-14 text-gray-400 mb-3" />
                    <span className="text-lg font-medium">Drag & Drop or Click to Upload</span>
                    <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={(e) => handleFileUpload(Array.from(e.target.files))}
                    />
                </label>
            </section>

            {Object.keys(progress).length > 0 && (
                <div className="mt-4">
                    {files.map((file) => (
                        <div key={file.name} className="mb-2">
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${progress[file.name] || 0}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {uploadedFiles.length > 0 && (
                <section className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Uploaded Files</h3>
                    <ul className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                            <li key={index} className="p-3 bg-gray-50 border rounded-md">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">{file.name}</span>
                                    <div className="flex space-x-2">
                                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            View
                                        </a>
                                        <button className="text-red-500 hover:text-red-700" onClick={() => deleteFile(file.name)}>
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {fileDetails[file.name] && (
                                    <div className="mt-2 p-2 bg-gray-100 rounded-md">
                                        <p className="text-sm text-gray-700">
                                            <strong>Type:</strong> {fileDetails[file.name].type}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <strong>Tags:</strong> {JSON.stringify(fileDetails[file.name].tags)}
                                        </p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </main>
    );
};

export default UploadDocuments;