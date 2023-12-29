import { Navigate } from "react-router-dom";
import { useUserAuth } from "../providers/UserAuthProvider";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { isAuthenticated, isLoading } = useUserAuth();
    if (!isAuthenticated && !isLoading) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRoute;
