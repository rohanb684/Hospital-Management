import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Appointment from "./pages/Appointment";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import { AccountContext } from "./context/AccountContext";
import { useContext, useEffect } from "react";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/appointment', element: <Appointment /> },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);

function App() {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(AccountContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3200/api/v1/user/patient",
          { withCredentials: true }
        );

        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (err) {
        setIsAuthenticated(false);
        setUser({});
      }
    };

    fetchUser();
  },[isAuthenticated]);

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
