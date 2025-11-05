import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function PrivateRoute({children, role}) {
    const {user} = useAuth()

    if(!user) return <Navigate to="/login"/>

    if(role && user.role !== role) return <Navigate to="/home" />

    return children
}

export default PrivateRoute