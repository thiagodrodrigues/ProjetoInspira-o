import {
  createBrowserRouter,
} from "react-router-dom";
import MainPage from "../pages/Home";
import LoginPage from "../components/Login/index.tsx";


const router = createBrowserRouter([
  {
      path: "/",
      element: <MainPage />,
  },
  {
      path: "/login",
      element: <LoginPage />,
  },
])

export default router