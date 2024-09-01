import { createContext, useContext, useEffect, useState } from "react";
import { useSocketContext } from "./SocketContext";

export const NotificationContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

// eslint-disable-next-line react/prop-types
export const NotificationProvider = ({children})=>{
    const [userNotifications,setUserNotifications]=useState([]);
    const [employeeNotifications,setEmployeeNotifications]=useState([]);
    const {socket}=useSocketContext();
    useEffect(()=>{
        if(socket){
            socket.on("user_notification", (data) => {
                setUserNotifications(prev=>[...prev,data.message]);
            });
            socket.on("employee_notification", (data) => {
                setEmployeeNotifications(prev=>[...prev,data.message]);
            });
        }
    },[socket]);
    return (
        <NotificationContext.Provider value={{userNotifications,employeeNotifications}}>
            {children}
        </NotificationContext.Provider>
    )
}
