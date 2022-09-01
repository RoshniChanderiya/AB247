import RestClient from "@/utils/RestClient";

export const getUser = async (id: string) => await RestClient(`user/${id}`);

export const getProfile = async () => await RestClient("user/profile");
