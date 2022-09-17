import './App.scss';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import AppRoute from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
    mutations: {},
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoute />
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
