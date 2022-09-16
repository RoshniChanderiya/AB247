import { getProfile } from "@/services/user";
import { Auth } from "@aws-amplify/auth";
import first from "lodash/first";
import React from "react";
import { useQuery } from "react-query";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = React.createContext<{
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<any>;
  logout: () => Promise<any>;
  user: any;
}>({} as any);

Auth.configure({
  userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
  region: first(process.env.REACT_APP_COGNITO_USER_POOL_ID?.split("_")),
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    data: user = {
      dealer: {},
    },
    isLoading,
    refetch,
  } = useQuery(["user-details"], () => getProfile(), {
    retry: 0,
    refetchOnWindowFocus: false,
  });
  /**
   * logs user in
   * @param username
   * @param password
   */
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await Auth.signIn(email, password);
    refetch();
  };

  const logout = async () => Auth.signOut();

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {isLoading ? "Loading..." : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
