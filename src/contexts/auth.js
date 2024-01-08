import { auth } from "@/lib/firebase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithPopup,
  onAuthStateChanged,
  signInWithPopup
} from "firebase/auth";

const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext();

const providerGoogle = new GoogleAuthProvider();
const providerGithub = new GithubAuthProvider();

const signInWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, providerGoogle);
  } catch (error) {
    console.error(error);
  }
};

const signInWithGithub = async () => {
  try {
    return await signInWithPopup(auth, providerGithub);
  } catch (error) {
    console.error(error);
  }
}
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginIsLoading, setLoginIsLoading] = useState(null);
  const [initAuth, setInitAuth] = useState(false)

  const loginWithGoogle = () => {
    setLoginIsLoading(true)
    signInWithGoogle().then(res => {
      console.log(res);
      setLoginIsLoading(false)
      if (!res?.user) return
      setUser(res?.user)
    })
  }

  const loginWithGithub = () => {
    setLoginIsLoading(true)
    signInWithGithub().then(async (res) => {
      console.log(res);
      setLoginIsLoading(false)
      if (!res?.user) return
      setUser(res?.user)
    })
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
    <AuthContext.Provider value={{ user, loginWithGoogle, loginWithGithub, logOut, initAuth, loginIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
