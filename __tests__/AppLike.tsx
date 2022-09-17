/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';

import { AuthContext } from '@/providers/AuthProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
    mutations: {},
  },
});
interface AppLikeProps {
  auth?: {
    login: () => void;
    logout: () => void;
    user: any;
  };
}
const AppLike: React.FC<PropsWithChildren<AppLikeProps>> = ({
  children,
  auth = {
    login: () => {},
    logout: () => {},
    user: {},
  },
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={auth as any}>
        <MemoryRouter>{children}</MemoryRouter>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default AppLike;
