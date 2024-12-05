"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "@/gql/getUser";

type User = {
  userId: string;
  username: string;
  displayname: string;
  photoURL?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setLoading(true);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });

    return () => unsubscribe();
  }, []);

  const userData = useFetchUserData(firebaseUser);
  useEffect(() => {
    if (userData) {
      setUser(userData);
      setLoading(false);
    }
  }, [userData]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
const useFetchUserData = (firebaseUser: FirebaseUser | null): User | null => {
  const { data, loading, error } = useQuery(GET_USER_PROFILE, {
    variables: { userId: firebaseUser?.uid },
  });

  if (loading || error || !data) return null;

  return {
    userId: data.userId,
    username: data.username,
    displayname: data.displayname,
    photoURL: firebaseUser?.photoURL ?? undefined,
  };
};

export function useAuth() {
  return useContext(AuthContext);
}
