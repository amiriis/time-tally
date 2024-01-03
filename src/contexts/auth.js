import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from "firebase/auth";

const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext();

const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginIsLoading, setLoginIsLoading] = useState(null);
  const [initAuth, setInitAuth] = useState(false)

  const loginWithGoogle = async () => {
    setLoginIsLoading(true)
    const result = await signInWithGoogle()
    setLoginIsLoading(false)
    if (!result?.user) return
    setUser(result?.user)
  }

  const logOut = () => {
    try {
      auth.signOut();
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
    <AuthContext.Provider value={{ user, loginWithGoogle, logOut, initAuth, loginIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
