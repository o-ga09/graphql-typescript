import { useState, useEffect } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { auth } from "../lib/firebase";
import {
  useCreateUserMutation,
  useGetUserQuery,
} from "@/lib/generated/graphql";

type User = {
  userId: string;
  username: string;
  displayname: string;
  photoURL?: string;
};

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { refetch: refetchUser } = useGetUserQuery({
    skip: true,
  });

  const [createUser] = useCreateUserMutation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await fetchUserData(firebaseUser);
          setUser(userData);
        } catch (err) {
          console.error(err);
          setError("ユーザーデータの取得に失敗しました");
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (
    firebaseUser: FirebaseUser
  ): Promise<User | null> => {
    const { data } = await refetchUser({ id: firebaseUser.uid });
    console.log(data);
    return data?.getUser
      ? {
          userId: firebaseUser.uid,
          username: data.getUser.username,
          displayname: data.getUser.displayname,
          photoURL: firebaseUser.photoURL || undefined,
        }
      : null;
  };

  const registerUser = async (
    userData: Omit<User, "userId">
  ): Promise<User> => {
    const { data } = await createUser({
      variables: {
        userId: auth.currentUser!.uid,
        ...userData,
      },
    });

    if (!data?.createUser) {
      throw new Error("ユーザー登録に失敗しました");
    }

    return data.createUser;
  };

  return { user, loading, error, registerUser };
}
