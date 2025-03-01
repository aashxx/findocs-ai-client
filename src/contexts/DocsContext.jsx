import React, { createContext, useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const DocsContext = createContext();

const DocsState = ({ children }) => {
    
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "documents"), (snapshot) => {
            const documents = snapshot.docs.map(doc => (doc.data()));
            setDocs(documents);
        }, (error) => {
            console.error("Error fetching documents:", error);
        });

        return () => unsubscribe(); 
    }, []);

    return (
        <DocsContext.Provider value={{ docs }}>
            {children}
        </DocsContext.Provider>
    );
}

export default DocsState;