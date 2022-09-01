import RestClient from "@/utils/RestClient";

export const getHeaderCount = async () => RestClient("/analytics/header");
