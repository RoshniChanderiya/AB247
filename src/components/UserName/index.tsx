import { useUser } from "@/hooks/user";
import get from "lodash/get";
import React from "react";

interface UserNameProps {
  id: string;
  type: string;
}

const UserName: React.FC<UserNameProps> = ({ id }) => {
  const { data } = useUser(id);
  const name = get(data, "_source.name", "");
  return <>{name}</>;
};

export default UserName;
