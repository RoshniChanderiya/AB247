import RestClient from "@/utils/RestClient";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) =>
  RestClient("/user/login", "POST", {
    email,
    password,
    type: "bidder",
  });
