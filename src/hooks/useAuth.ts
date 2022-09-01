import { AuthContext } from "@/providers/AuthProvider";
import { retrieveErrorMessage } from "@/utils/RestClient";
import Message from "@/utils/Toast";
import get from "lodash/get";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";

const useAuth = () => {
  const { user, login, logout: cognitoLogout } = useContext(AuthContext);

  const queryClient = useQueryClient();
  const { mutateAsync: loginMutation, isLoading: isLoggingIn } = useMutation(
    login,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user-details"]);
      },
    }
  );
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
    isLoggedIn: Boolean(user),
    token: get(user, "signInUserSession.accessToken.jwtToken"),
  };
};

export default useAuth;
