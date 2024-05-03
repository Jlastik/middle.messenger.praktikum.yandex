import "./global.pcss";
import { Router } from "./utils/router.ts";
import AuthPage from "./pages/auth-page";
import RegPage from "./pages/reg-page";
import HomePage from "./pages/home-page";
import ProfilePage from "./pages/profile-page";

const router = Router.getInstance("#app");

router
  .use("/", AuthPage)
  .use("/sign-up", RegPage)
  .use("/messenger", HomePage)
  .use("/settings", ProfilePage)
  .start();
