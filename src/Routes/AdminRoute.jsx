/* eslint-disable react/prop-types */


import { Navigate } from "react-router";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth;
    const [isAdmin, isAdminLoading] = useAdmin()
  const location = useLocation();
  console.log(location);

    if (loading || isAdminLoading) {
      return <progress className="progress w-56 text-center"></progress>;
    }
  if (user && isAdmin) {
    return children;
  }
  
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
