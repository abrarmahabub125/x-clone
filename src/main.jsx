import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "./app/router.jsx";
import AuthProvider from "./features/auth/providers/AuthProvider.jsx";
import SearchProvider from "./features/auth/providers/SearchProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <RouterProvider router={router} />
    </SearchProvider>
  </AuthProvider>,
);
