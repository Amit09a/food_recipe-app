import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase"; // ✅ Make sure firebase is setup correctly

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔑 Login function
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔑 Signup function
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 🔑 Logout function
  const logout = () => {
    return signOut(auth);
  };

  // 🔄 Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ useAuth hook
export const useAuth = () => useContext(AuthContext);
