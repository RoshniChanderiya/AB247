import { useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { SocketContext } from '@/providers/SocketProvider';
import { getToken } from '@/utils/RestClient';

const useSocketConnection = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const establishSocketConnection = async () => {
    if (socket) {
      return;
    }
    console.log(`Establishing connection for chat`);
    const token = await getToken();
    const newSocket = io(`${process.env.REACT_APP_SOCKET_URL}/chat`, {
      auth: {
        token: token.replace('Bearer ', ''),
      },
      transports: ['websocket', 'polling', 'flashsocket'],
    });
    setSocket(newSocket);
  };

  useEffect(() => {
    establishSocketConnection();
    return () => {
      if (socket) {
        socket.disconnect();
        socket.removeAllListeners();
      }
    };
    // eslint-disable-next-line
  }, []);

  return socket;
};

export const useSocket = () => {
  const socket = useContext(SocketContext);

  return socket;
};

export default useSocketConnection;
