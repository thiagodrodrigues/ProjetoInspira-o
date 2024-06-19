import {
  createBrowserRouter,
} from "react-router-dom";
import MainPage from "../pages/Home";
import LoginPage from "../components/Login/index.tsx";
import CreateUserPage from "../pages/CreateUser.tsx";
import PortalPage from "../pages/Portal.tsx";


const router = createBrowserRouter([
  {
      path: "/",
      element: <MainPage />,
  },
  {
      path: "/login",
      element: <LoginPage />,
  },
  {
      path: "/users/new",
      element: <CreateUserPage />,
  },
  {
      path: "/portal",
      element: <PortalPage />,
  },
])

export default router