import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ContextProvider } from "@/contexts/ContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material";
import { Toaster } from "react-hot-toast";
require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const theme = createTheme({});
  return (
    <>
      <Toaster />
      <ThemeProvider theme={theme}>
        <ChakraProvider>
          <ContextProvider>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </ContextProvider>
        </ChakraProvider>
      </ThemeProvider>
    </>
  );
}
