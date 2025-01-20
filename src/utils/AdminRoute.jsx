import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Sidebar from "../Components/Admin/Sidebar";

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user.role === "admin" || user.role === "moderator" ? (
    <div className="admin-page">
      <Sidebar />
      <div className="admin-main-content">
        {children}
      </div>
    </div>
  ) : (
    <Navigate to="/signin" />
  );
}
export default AdminRoute;
