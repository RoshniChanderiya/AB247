import useSocketConnection from "@/hooks/socket";
import React from "react";
import { Socket } from "socket.io-client";

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketContext = React.createContext<Socket | null>(null);

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = useSocketConnection();

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
