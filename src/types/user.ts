import { DataModel, IdType } from "./generic";

interface UserPayload {
  first_name: string;
  last_name: string;
  title: string;
  email: string;
  extension?: string;
  mobile?: string;
  phone: string;
  bidding_preference?: string;
  dealer: IdType;
}
export interface User extends DataModel<UserPayload> {}
