import AuthPage from "./pages/auth-page";
import RegPage from "./pages/reg-page";
import HomePage from "./pages/home-page";
import ProfilePage from "./pages/profile-page";

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
  {
    name: "profile",
    path: "/profile",
    element: ProfilePage,
  },
];
