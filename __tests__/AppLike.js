import { AuthContext } from "@/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
    mutations: {},
  },
});

const AppLike = ({
  children,
  auth = {
    login: () => {},
    logout: () => {},
    user: {},
  },
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={auth}>
        <MemoryRouter>{children}</MemoryRouter>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default AppLike;
