import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function UserRoutes() {
    const { token, isUser, isAdmin } = useContext(AuthContext);
    return token && isUser || isAdmin ? <Outlet /> : <Navigate to="/" />;
}