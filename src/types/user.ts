import { DataModel, IdType } from "./generic";

interface UserPayload {
  businessTitle?: string;
  email: string;
  extension?: string;
  mobile?: string;
  phone: string;
  dealer?: IdType;
}
export interface User extends DataModel<UserPayload> {}
