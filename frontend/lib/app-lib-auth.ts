import client from "./apolloClient";
import {
  CreateUserDocument,
  CurrentUserDocument,
  LoginDocument,
  LogoutDocument,
} from "./generated/graphql";

let isLoggedIn = false;
let currentUser: string | null = null;

export const login = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const { data } = await client.mutate({
      mutation: LoginDocument,
      variables: { email, password },
    });
    if (data && data.login && data.login.token) {
      localStorage.setItem("token", data.login.token);
      isLoggedIn = true;
      currentUser = data.login.user.username;
      return true;
    }
  } catch (error) {
    console.error("Login error:", error);
  }
  return false;
};

export const logout = async (): Promise<void> => {
  try {
    await client.mutate({
      mutation: LogoutDocument,
    });
    localStorage.removeItem("token");
    isLoggedIn = false;
    currentUser = null;
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const isAuthenticated = (): boolean => {
  return isLoggedIn;
};

export const getCurrentUser = async (): Promise<string | null> => {
  try {
    const { data } = await client.query({
      query: CurrentUserDocument,
      fetchPolicy: "network-only",
    });

    if (data && data.currentUser) {
      currentUser = data.currentUser.username;
      return currentUser;
    }
  } catch (error) {
    console.error("Get current user error:", error);
  }
  return null;
};

export const signup = async (
  username: string,
  email: string,
  role: string,
  birthday: string,
  sex: string,
  passwordHash: string,
  address: string
): Promise<boolean> => {
  try {
    const { data } = await client.mutate({
      mutation: CreateUserDocument,
      variables: {
        username,
        email,
        role,
        birthday,
        sex,
        passwordHash,
        address,
      },
    });

    if (data && data.createUser) {
      isLoggedIn = true;
      currentUser = data.createUser.username;
      return true;
    }
  } catch (error) {
    console.error("Signup error:", error);
  }
  return false;
};
