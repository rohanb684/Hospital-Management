import React, { useContext, useState } from "react";
import { AccountContext } from "../context/AccountContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AccountContext);
  const [show, setShow] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:3200/api/v1/user/patient/logout", {withCredentials:true});

      toast.success(response.data.message);
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const navigateLogin = () => {
    navigate('/login')
  };

  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              Appointment
            </Link>
            <Link to={"/about"} onClick={() => setShow(!show)}>
              About Us
            </Link>
          </div>
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            !isLoginPage && (
          <button className="loginBtn btn" onClick={navigateLogin}>
            LOGIN
          </button>
        )
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
