"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { gql, useQuery } from "@apollo/client";
import SetUsernameModal from "../components/SetUsernameModal";

type User = {
  uid: string;
  username: string | null;
  displayname: string | null;
  photoURL: string | null;
};
interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      userId
      username
      displayname
    }
  }
`;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [usernameModalOpen, setUsernameModalOpen] = useState(false);

  const { refetch } = useQuery(GET_USER, {
    skip: !user,
    variables: { id: user?.uid },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setLoading(true);

        // ユーザーデータを取得
        let userData;
        try {
          const { data } = await refetch({
            id: firebaseUser.uid,
          });
          userData = data.getUser;
        } catch {
          userData = null;
        }

        if (!userData) {
          // ユーザーデータが存在しない場合、モーダルを表示
          setUser({
            uid: firebaseUser.uid,
            username: null,
            displayname: null, // displaynameをnullに設定
            photoURL: firebaseUser.photoURL,
          });
          setUsernameModalOpen(true);
        } else {
          // ユーザー情報を設定
          const u = {
            uid: firebaseUser.uid,
            username: userData.username,
            displayname: userData.displayname,
            photoURL: firebaseUser.photoURL,
          };
          setUser(u);
        }
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
      {usernameModalOpen && (
        <SetUsernameModal onClose={() => setUsernameModalOpen(false)} />
      )}
    </AuthContext.Provider>
  );
};
