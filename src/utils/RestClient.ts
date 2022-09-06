import { Auth } from "@aws-amplify/auth";
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import get from "lodash/get";

export const getToken = async (): Promise<string> => {
  const user = await Auth.currentAuthenticatedUser();
  return `Bearer ${user.signInUserSession.accessToken.jwtToken}`;
};

const RestClient = async (
  url: string,
  method: Method = "GET",
  params: any = {},
  options: AxiosRequestConfig = {}
): Promise<AxiosResponse["data"]> => {
  let token;
  try {
    token = await getToken();
  } catch (error) {}
  const config: AxiosRequestConfig = {
    ...options,
    baseURL: options.baseURL || process.env.REACT_APP_API_URL,
    method,
    headers: {
      ...options?.headers,
      Authorization: token as string,
    },
    data: method !== "GET" ? params : undefined,
    params: method === "GET" ? params : undefined,
  };
  try {
    return (await axios(url, config)).data;
  } catch (error) {
    throw get(error, "response", error);
  }
};

export const retrieveErrorMessage = (error: any) => {
  const message = get(
    error,
    "data.error",
    get(
      error,
      "message",
      "An unknown error occurred while completing your request."
    )
  );
  return get(
    error,
    "data.message",
    typeof message === "string"
      ? message
      : "An unknown error occurred while completing your request."
  );
};

export default RestClient;
