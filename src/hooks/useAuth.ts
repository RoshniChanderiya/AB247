import { AuthContext } from "@/providers/AuthProvider";
import { retrieveErrorMessage } from "@/utils/RestClient";
import Message from "@/utils/Toast";
import { Auth } from "@aws-amplify/auth";
import get from "lodash/get";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const useAuth = () => {
  const { user, login, logout: cognitoLogout } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const queryClient = useQueryClient();
  const { mutateAsync: loginMutation, isLoading: isLoggingIn } = useMutation(
    login,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user-details"]);
      },
    }
  );
  useEffect(() => {
    Auth.currentAuthenticatedUser().catch((err) => {
      setIsLoggedIn(false);
    });
  }, []);
  /**
   *
   * @param values
   */
  const onLogin = async (
    values: { email: string; password: string },
    callback: () => void = () => {}
  ) => {
    try {
      await loginMutation(values);
      callback();
    } catch (error) {
      Message.error(retrieveErrorMessage(error));
    }
  };
  /**
   * logs user out
   */
  const logout = async (callback: () => void) => {
    await cognitoLogout();
    queryClient.clear();
    callback();
  };

  return {
    login: onLogin,
    logout,
    user,
    isLoggingIn,
    isLoggedIn,
    token: get(user, "signInUserSession.accessToken.jwtToken"),
  };
};

export default useAuth;
