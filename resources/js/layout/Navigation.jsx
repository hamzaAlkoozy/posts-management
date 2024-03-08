// Navigation Component
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from "../store/auth-context";

const Navigation = () => {
    const authContext = useContext(AuthContext);

    return (
        <nav className="bg-blue-500 p-4 text-white">
            <ul className="flex space-x-4">
                {authContext.isAuthenticated ? (
                    <>
                        <li><Link to="/create-post">Create Post</Link></li>
                        <li><Link to="/list-posts">List Posts</Link></li>
                        <li onClick={authContext.logout}><Link to="/login">Logout</Link></li>
                    </>
                ) : (
                    <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    </>
                    )}
            </ul>
        </nav>
    );
};

export default Navigation;
