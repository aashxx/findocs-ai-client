import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';

export const UsersContext = createContext();

const UsersState = ({ children }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
            const usersData = snapshot.docs.map(doc => (doc.data()));
            setUsers(usersData);
        }, (error) => {
            console.error("Error fetching documents:", error);
        });

        return () => unsubscribe(); 
    }, []);

    return (
        <UsersContext.Provider value={{ users }}>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersState;
