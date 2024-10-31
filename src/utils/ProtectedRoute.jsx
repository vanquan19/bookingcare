import { useSelector } from "react-redux";
import fetchData from "./fetchData";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ component: Component, navigate, ...rest }) => {
    const user = useSelector((state) => state.auth.isAuthenticated);
    const token = useSelector((state) => state.auth.accessToken);
    const [isVerify, setIsVerify] = useState(null);
    const checkVerify = async () => {
        try {
            const isVerify = await fetchData("/protected_route", "POST", null, "application/json", token);
            setIsVerify(isVerify);
        } catch (error) {
            setIsVerify(false);
        }
    };
    useEffect(() => {
        checkVerify();
    }, []);
    if (isVerify === null) return <div>Loading...</div>;
    return user && isVerify ? <Component {...rest} /> : <Navigate to={navigate} />;
};
export default ProtectedRoute;
