import { auth, db } from "@/lib/firebase";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    getRedirectResult,
    onAuthStateChanged,
    signInWithCredential,
    signInWithRedirect,
    signOut
} from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import moment from "jalali-moment";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const providerMap = {
    "google.com": new GoogleAuthProvider(),
    "github.com": new GithubAuthProvider(),
};

const logError = async (action, error) => {
    console.error(error);
    await addDoc(collection(db, "logs"), {
        action,
        error: {
            code: error.code,
            message: error.message,
            stack: error.stack,
        },
        created_at: moment().toDate(),
    });
};

const updateUserInDb = async (user) => {
    try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            const userData = {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                role: "user",
            };
            await setDoc(userDocRef, userData);
            return userData;
        }
        return userDoc.data();
    } catch (error) {
        await logError("update user after sign in", error);
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loginIsLoading, setLoginIsLoading] = useState(false);
    const [initAuth, setInitAuth] = useState(false);

    const login = useCallback(async (provider) => {
        setLoginIsLoading(true);
        try {
            await signInWithRedirect(auth, provider);
        } catch (error) {
            await logError(`sign in with ${provider.providerId}`, error);
        } finally {
            setLoginIsLoading(false);
        }
    }, []);

    const logOut = useCallback(async () => {
        try {
            await signOut(auth);
        } catch (error) {
            await logError("sign out", error);
        }
    }, []);

    useEffect(() => {
        const getRedirect = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result) {
                    const credential = providerMap[result.providerId].credentialFromResult(result);
                    await signInWithCredential(auth, credential);
                }
            } catch (error) {
                await logError("get redirect result", error);
            }
        };
        getRedirect();
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const updatedUser = await updateUserInDb(currentUser);
                setUser(updatedUser);
            } else {
                setUser(null);
            }
            setInitAuth(true);
            setLoginIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loginWithGoogle: () => login(providerMap["google.com"]),
                loginWithGithub: () => login(providerMap["github.com"]),
                logOut,
                initAuth,
                loginIsLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
