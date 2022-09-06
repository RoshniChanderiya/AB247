import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import React from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Container } from "reactstrap";
import "./App.scss";
import AppRoute from "./routes";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

dayjs.extend(utc);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
    mutations: {},
  },
});

const App: React.FC = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container fluid className="app-container">
        <AppRoute />
      </Container>
      <Toaster />
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools position="bottom-right" />
      )}
    </QueryClientProvider>
  );
};

export default App;
