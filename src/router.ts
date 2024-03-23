import AuthPage from "./pages/auth-page";

export const router = [
  { name: "auth", path: "/", element: AuthPage },
  {
    name: "main",
    path: "/home",
    element: AuthPage,
  },
  {
    name: "register",
    path: "/register",
    element: AuthPage,
  },
];
