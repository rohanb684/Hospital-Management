import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';

import { AccountContext } from '../context/AccountContext'


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated, setAdmin } = useContext(AccountContext);

  const navigate = useNavigate();

  if(isAuthenticated){
    return <Navigate to={'/'}/>
   }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3200/api/v1/user/login",
        { email, password, confirmPassword, role: "Admin" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("response");
      console.log(response);

      toast.success(response.data.message);
      setIsAuthenticated(true);
      setAdmin(response.data.user);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate('/');

    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message)
    }
  };

  return (
    <>
    <section className="container form-component">
        <img src="/logo.png" alt="logo" className="logo" />
        <h1 className="form-title">WELCOME TO HealthCare</h1>
        <p>Only Admins Are Allowed To Access These Resources!</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
