import React from 'react';
import { Socket } from 'socket.io-client';

import useSocketConnection from '@/hooks/socket';

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketContext = React.createContext<Socket | null>(null);

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = useSocketConnection();

  return socket ? (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  ) : (
    <React.Fragment />
  );
};

export default SocketProvider;
