import React, { useContext, useEffect, useState } from "react";
import server from "../server/axios";
import { useNotificatContext } from "./NotificatorContext";

const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [Authentication, setAuthentication] = useState({
    status: false,
    user: {},
  });
  const LunchNotification = useNotificatContext();
  useEffect(() => {
    if (Authentication.status) {
      localStorage.setItem("qosToken", JSON.stringify(Authentication.user));
    }
    if (!Authentication.status && localStorage.getItem("qosToken")) {
      let User = JSON.parse(localStorage.getItem("qosToken"));
      setAuthentication({ status: true, user: User });
    }
  }, [Authentication]);
  async function handleAuthentication(
    action,
    data = {},
    withCredential = false
  ) {
    let response;
    switch (action) {
      case "LOGIN":
        response = await server.login(data);
        if (response.statusText === "OK" && response.status === 200) {
          localStorage.setItem("qosToken", JSON.stringify(response.data.user));
          setAuthentication({ status: true, user: response.data.user });
        } else {
          LunchNotification(false, response.response.data.reason);
        }
        break;
      case "LOGOUT":
        response = await server.logout();
        if (response.statusText === "OK" && response.status === 200) {
          localStorage.removeItem("qosToken");
          setAuthentication({ status: false, user: {} });
        }
        break;
      case "REGISTER":
        response = await server.register(data);
        if (response.statusText === "OK" && response.status === 200) {
          localStorage.setItem("qosToken", JSON.stringify(response.data.user));
          setAuthentication({ status: true, user: response.data.user });
        } else {
          LunchNotification(false, response.response.data.reason);
        }
        break;
      case "UPDATE":
        response = await server.updateAccount(
          Authentication.user._id,
          withCredential,
          data
        );
        if (response.statusText === "OK" && response.status === 200) {
          console.log(response);
          LunchNotification(true, response.data.message);
        } else {
          LunchNotification(false, response.response.data.reason);
        }
        break;
      default:
    }
  }
  return (
    <AuthContext.Provider value={{ Authentication, handleAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
