import {useEffect, useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../store/auth-context";

function useConditionalRedirect(redirectUrl = '/login', isProtectedRoute = true) {
    const { isAuthenticated, isLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) {
            if (isProtectedRoute && !isAuthenticated) {
                navigate(redirectUrl);
            } else if (!isProtectedRoute && isAuthenticated) {
                navigate(redirectUrl);
            }
        }
    }, [isAuthenticated, isLoading, navigate, redirectUrl, isProtectedRoute]);
}

export default useConditionalRedirect;
