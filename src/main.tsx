import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./Oasis-components/theme-provider/theme-provider.tsx";
import { AuthContextProvider } from "./Oasis-components/Auth/auth.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* provide auth context */}
    <AuthContextProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <div className="h-auto bg-background ">
              <App />
            </div>
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>
);
