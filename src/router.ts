import AuthPage from "./pages/auth-page";
import RegPage from "./pages/reg-page";
import HomePage from "./pages/home";

export const router = [
  { name: "auth", path: "/", element: AuthPage },
  {
    name: "main",
    path: "/home",
    element: HomePage,
  },
  {
    name: "register",
    path: "/registration",
    element: RegPage,
  },
];
