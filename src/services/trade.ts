import RestClient from "@/utils/RestClient";

export const getTrade = (id: string) => RestClient(`trade/${id}`);
