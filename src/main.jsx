import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./app/router.jsx";
import AuthProvider from "./features/auth/providers/AuthProvider.jsx";
import SearchProvider from "./features/auth/providers/SearchProvider.jsx";
import "./index.css";

const queryClient = new QueryClient();
const googleClientId =
  "895952574720-ramf138ck4r2tevqghvoc8aut09av8ci.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <SearchProvider>
          <RouterProvider router={router} />
        </SearchProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>,
);
