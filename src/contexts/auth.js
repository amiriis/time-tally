import { auth, db } from "@/lib/firebase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import moment from "jalali-moment";

const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext();

const providerGoogle = new GoogleAuthProvider();
const providerGithub = new GithubAuthProvider();

const signInWithGoogle = () => signInWithPopup(auth, providerGoogle);

const signInWithGithub = () => signInWithPopup(auth, providerGithub);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginIsLoading, setLoginIsLoading] = useState(null);
  const [initAuth, setInitAuth] = useState(false)

  const loginWithGoogle = () => {
    setLoginIsLoading(true)
    setTimeout(() => {
      signInWithGoogle().then(res => {
        setLoginIsLoading(false)
        if (!res?.user) return
        setUser(res?.user)
      }).catch(error => {
        const errorData = {
          code: error.code,
          message: error.message,
          stack: error.stack,
        };
        setLoginIsLoading(false)
        addDoc(collection(db, "logs"), {
          action: "sign in with google",
          error: errorData,
          created_at: moment().toDate(),
        });
      })
    }, 1000);
  }

  const loginWithGithub = () => {
    setLoginIsLoading(true)
    setTimeout(() => {
      signInWithGithub().then((res) => {
        setLoginIsLoading(false)
        if (!res?.user) return
        setUser(res?.user)
      }).catch(error => {
        const errorData = {
          code: error.code,
          message: error.message,
          stack: error.stack,
        };
        setLoginIsLoading(false)
        addDoc(collection(db, "logs"), {
          action: "sign in with github",
          error: errorData,
          created_at: moment().toDate(),
        });
      })
    }, 1000);
  }

  const logOut = () => {
    try {
      auth.signOut();
    } catch (error) {
      const errorData = {
        code: error.code,
        message: error.message,
        stack: error.stack,
      };
      addDoc(collection(db, "logs"), {
        action: "sign out",
        error: errorData,
        created_at: moment().toDate(),
      });
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
