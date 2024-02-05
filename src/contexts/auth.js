import { auth, db } from "@/lib/firebase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect
} from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import moment from "jalali-moment";

const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext();

const providerGoogle = new GoogleAuthProvider();
const providerGithub = new GithubAuthProvider();

const signInWithGoogle = () => signInWithRedirect(auth, providerGoogle);

const signInWithGithub = () => signInWithRedirect(auth, providerGithub);

const updateUserInDb = async (user) => {
  try {
    const userDocRef = doc(collection(db, "users"), user.uid)
    const userDoc = await getDoc(userDocRef)

    let userData = {}
    if (!userDoc.exists()) {
      userData = {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: 'user',
      };
      await setDoc(userDocRef, userData);
    } else {
      userData = userDoc.data()
    }

    return userData
  } catch (error) {
    console.error(error.message);
    const errorData = {
      code: error.code,
      message: error.message,
      stack: error.stack,
    };
    addDoc(collection(db, "logs"), {
      action: "update user after sign in",
      error: errorData,
      created_at: moment().toDate(),
    });
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginIsLoading, setLoginIsLoading] = useState(null);
  const [initAuth, setInitAuth] = useState(false)

  const loginWithGoogle = () => {
    setLoginIsLoading(true)
    setTimeout(() => {
      signInWithGoogle().then(async ({ user }) => {
        if (user) {
          const _user = await updateUserInDb(user)
          setUser(_user)
        }
        setLoginIsLoading(false)
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
      signInWithGithub().then(async ({ user }) => {
        if (user) {
          const _user = await updateUserInDb(user)
          setUser(_user)
        }
        setLoginIsLoading(false)
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
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      let _user = currentUser
      if (currentUser) {
        _user = await updateUserInDb(currentUser)
      }
      setUser(_user);
      setInitAuth(true)
    });

    return () => unsubscribe();
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, loginWithGithub, logOut, initAuth, loginIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
