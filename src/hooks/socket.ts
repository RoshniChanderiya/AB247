import { getToken } from "@/utils/RestClient";
import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocketConnection = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const establishSocketConnection = useCallback(async () => {
    console.log(`Establishing connection for live auction`);
    const token = await getToken();
    const newSocket = io(`${process.env.REACT_APP_SCOKET_URL}/auctions`, {
      auth: {
        token: token.replace("Bearer ", ""),
      },
      transports: ["websocket", "polling", "flashsocket"],
    });

    setSocket(newSocket);
  }, []);

  useEffect(() => {
    establishSocketConnection();

    return () => {
      if (socket) {
        socket.disconnect();
        socket.removeAllListeners();
      }
    };
    // eslint-disable-next-line
  }, [establishSocketConnection]);

  return socket;
};

export default useSocketConnection;
