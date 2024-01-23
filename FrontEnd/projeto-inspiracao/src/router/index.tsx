import {
  createBrowserRouter,
} from "react-router-dom";
import Usuarios from "../pages/ListaUsuario";


const router = createBrowserRouter([
    {
        path: "/users",
        element: <Usuarios decoded={[]} name={""} email={""} photo={""} username={""} age={""} _id={""} />,
    },
])

export default router