import {createContext, useEffect, useState} from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    isLoading: true,
    login: () => {},
    logout: () => {},
});

export function AuthContextProvider(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('api-token');
        if (token) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    function loginHandler() {
        setIsAuthenticated(true);
    }

    function logoutHandler() {
        setIsAuthenticated(false);
        localStorage.removeItem('api-token');
    }

    const context = {
        isAuthenticated: isAuthenticated,
        isLoading: isLoading,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
