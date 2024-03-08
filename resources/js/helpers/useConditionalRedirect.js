import {useEffect, useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../store/auth-context";

function useConditionalRedirect(redirectUrl = '/login', isProtectedRoute = true) {
    const authContext = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (isProtectedRoute && !authContext.isAuthenticated) {
            navigate(redirectUrl);
        } else if (!isProtectedRoute && authContext.isAuthenticated) {
            navigate(redirectUrl);
        }
    }, [authContext.isAuthenticated, navigate, redirectUrl, isProtectedRoute]);
}

export default useConditionalRedirect;
