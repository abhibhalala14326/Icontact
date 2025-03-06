import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserForm from "../Componenets/UserForm";
import ContactForm from "../Componenets/ContactFrom";
import Home from "../Componenets/Home";
import Navbar from "./Navbar";
import Login from "../Componenets/Login";

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user",
        element: <UserForm />,
      },
      {
        path: "/contact",
        element: <ContactForm />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function Layout() {
  return <RouterProvider router={router} />;
}

export default Layout;
