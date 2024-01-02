import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initAuth, setInitAuth] = useState(false)

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    try {
      signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setInitAuth(true)
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logOut, initAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
