import {createContext, useEffect, useState} from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    login: () => {
    },
    logout: () => {
    },
});

export function AuthContextProvider(props) {
    const initialState = false;
    const [isAuthenticated, setIsAuthenticated] = useState(initialState);

    useEffect(() => {
        const token = localStorage.getItem('api-token');
        if (token) {
            setIsAuthenticated(true);
        }
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
