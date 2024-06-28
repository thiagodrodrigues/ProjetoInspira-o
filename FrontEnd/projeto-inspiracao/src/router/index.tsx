import {
  createBrowserRouter,
} from "react-router-dom";
import MainPage from "../pages/Home";
import LoginPage from "../components/Login/index.tsx";
import CreateUserPage from "../pages/CreateUser.tsx";
import PortalPage from "../pages/Portal.tsx";
import ProfilePage from "../pages/Profile.tsx";
import CreateAppointmentPage from "../pages/CreateAppointment.tsx";


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
  {
      path: "/users",
      element: <ProfilePage />,
  },
  {
      path: "/schedules/new",
      element: <CreateAppointmentPage />,
  },
])

export default router