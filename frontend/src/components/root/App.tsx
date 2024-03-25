import { HelmetProvider } from "react-helmet-async";
import Main from "~/components/root/Main";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient: QueryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Main />
      </HelmetProvider>
    </QueryClientProvider>
  )
};
