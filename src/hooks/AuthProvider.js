import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ToastMessage } from "../utils";

require('dotenv').config()

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || "");
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [refresh, setRefresh] = useState(localStorage.getItem("refresh") || "")
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      const response = await fetch(process.env.BASE_URL + "auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res)
      if (res.access) {
        setUser({"email": res.email, "username":res.username});
        setToken(res.access)
        setRefresh(res.refresh)
        localStorage.setItem("site", res.access);
        localStorage.setItem("refresh", res.refresh);
        localStorage.setItem("user", JSON.stringify({ email: res.email, username: res.username }));
        ToastMessage("success", "Login successful")
        const data = {
          token: res.access,
          refresh: res.refresh
        }
        return data;
      }
      else{
        console.log("an error occured")
        const data = {
          error: "Invalid credentials"
        }
        return data;
      }
    } catch (err) {
      return ToastMessage("error", err.message || "An  error occured")
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    setRefresh("")
    localStorage.removeItem("site");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setTimeout(() => {navigate("/login")}, 2000)
    
  };

  return (
    <div>
    <AuthContext.Provider value={{ refresh, token, user, loginAction, logOut, setToken, setRefresh }}>
      {children}
    </AuthContext.Provider>
    </div>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
