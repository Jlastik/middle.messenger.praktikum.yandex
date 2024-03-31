import AuthPage from "./pages/auth-page";
import RegPage from "./pages/reg-page";
import HomePage from "./pages/home-page";
import ProfilePage from "./pages/profile-page";

export const router = [
  { name: "auth", path: "/", element: AuthPage, file: "index.html" },
  {
    name: "main",
    path: "/home",
    element: HomePage,
    file: "home.html",
  },
  {
    name: "register",
    path: "/registration",
    element: RegPage,
    file: "registration.html",
  },
  {
    name: "profile",
    path: "/profile",
    element: ProfilePage,
    file: "profile.html",
  },
  {
    name: "error",
    path: "/error",
    element: null,
    file: "error.html",
  },
  {
    name: "notfound",
    path: "/notfound",
    element: null,
    file: "notfound.html",
  },
];
