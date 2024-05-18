import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ToastMessage } from "../utils";

require('dotenv').config()

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
      if (res.email) {
        setUser({"email": res.email, "username":res.username});
        setToken(res.access)
        setRefresh(res.refresh)
        localStorage.setItem("site", res.access);
        localStorage.setItem("refresh", res.refresh);
        navigate("/home");
        return;
      }
      throw new Error(res.error);
    } catch (err) {
        setToken(null)
        setUser(null)
        setRefresh(null)
        localStorage.setItem("site", '');
      return ToastMessage("error", err.message || "An  error occured")
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <div>
    <AuthContext.Provider value={{ token, user, loginAction, logOut, setToken, setRefresh }}>
      {children}
    </AuthContext.Provider>
    </div>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
