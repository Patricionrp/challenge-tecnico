import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function AdminRoutes() {
    const { token, isAdmin } = useContext(AuthContext);
    return token && isAdmin ? <Outlet /> : <Navigate to="/admin/login" />;
}