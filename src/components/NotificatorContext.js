import React, { useContext, useState, useEffect } from "react";
import coche from "../images/coche.svg";
import cancel from "../images/cancel.svg";

const NotificationContext = React.createContext();

export default function NotificationProvider({ children }) {
  const [Show, setShow] = useState(false);
  const [NotificationInfo, setNotificationInfo] = useState({
    success: true,
    message: false,
  });

  const src = NotificationInfo.success ? coche : cancel;

  function LunchNotification(success, message) {
    setNotificationInfo({ success, message });
  }
  useEffect(() => {
    if (NotificationInfo.message) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  }, [NotificationInfo]);
  return (
    <NotificationContext.Provider value={LunchNotification}>
      {children}
      <div
        id="notificator"
        className={`transition-all duration-500 flex items-center p-4 rounded-full shadow-lg border border-qosdark border-opacity-10 bg-qosgray h-20 w-80 ${
          Show ? "right-0" : "-right-full"
        } fixed top-2 z-50`}
      >
        <img className="h-8 w-8 block mr-4" src={src} alt="iconStatus" />
        <div className="text-mmd text-qosdark text-opacity-70">
          {NotificationInfo.message}
        </div>
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotificatContext() {
  return useContext(NotificationContext);
}
