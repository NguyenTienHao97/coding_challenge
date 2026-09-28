import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SwapTokens from "./pages/SwapTokens";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SwapTokens />
    </QueryClientProvider>
  );
}
