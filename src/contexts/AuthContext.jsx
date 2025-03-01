import { auth, db } from '@/lib/firebase';
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    updateProfile,
    signOut
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const AuthContext = createContext();

const AuthState = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signUpWithCredentials = async (fullName, email, password) => {
        try {
            setLoading(true);

            // **Check if user already exists**
            const checkExistingUser = await getDoc(doc(db, "users", email));
            if (checkExistingUser.exists()) {
                toast("This account already exists");
                setLoading(false);
                return;
            }

            // **Create user in Firebase Auth**
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const editUser = result.user;

            // **Update profile display name & photo**
            await updateProfile(editUser, {
                displayName: fullName,
                photoURL: "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg"
            });

            // **Save user data in Firestore**
            await setDoc(doc(db, 'users', email), {
                fullName,
                email,
                photo: editUser.photoURL,
                role: "User",
                createdAt: serverTimestamp()
            });

            setUser({ uid: editUser.uid, fullName, email, photo: editUser.photoURL, role: "User" });

            setLoading(false);
            navigate('/');

        } catch (error) {
            console.error(error);
            toast("Failed to create account");
            setLoading(false);
        }
    };

    const userLogin = async (email, password) => {
        try {
            setLoading(true);
            const checkExistingUser = await getDoc(doc(db, "users", email));
            if (!checkExistingUser.exists()) {
                toast("This account does not exist!");
                setLoading(false);
                return;
            }

            const result = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await getDoc(doc(db, 'users', email));
            if (userDoc.exists()) {
                setUser({ uid: result.user.uid, ...userDoc.data() });
            }

            setLoading(false);
            navigate('/');

        } catch (error) {
            console.error(error);
            toast("Failed to login");
            setLoading(false);
        }
    };

    const signOutUser = async () => {
        try {
            setLoading(true);
            await signOut(auth);
            setUser(null);
            setLoading(false);
            navigate('/login');
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userRef = doc(db, 'users', user.email);
                    const userDoc = await getDoc(userRef);

                    if (userDoc.exists()) {
                        setUser({ uid: user.uid, ...userDoc.data() });
                    } else {
                        setUser(null);
                    }
                } catch (err) {
                    console.error("Error fetching user document:", err);
                }
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe(); // Cleanup subscription
    }, []);

    return (
        <AuthContext.Provider value={{ signUpWithCredentials, userLogin, signOutUser, user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthState;