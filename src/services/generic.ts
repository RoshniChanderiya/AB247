import { Bank } from "@/types/bank";
import RestClient from "@/utils/RestClient";

export const getBanks = async (): Promise<Bank[]> => RestClient("/banks");
