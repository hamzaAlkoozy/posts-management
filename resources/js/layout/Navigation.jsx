// Navigation Component
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from "../store/auth-context";

import classes from "./Navigation.module.css";

const Navigation = () => {
    const authContext = useContext(AuthContext);

    return (
        <nav className="bg-blue-500 p-4">
            <div className="flex justify-between">
                {authContext.isAuthenticated ? (
                    <>
                        <ul className="flex space-x-4">
                            <li><Link className={classes.navLink} to="/create-post">Create Post</Link></li>
                            <li><Link className={classes.navLink} to="/list-posts">List Posts</Link></li>
                        </ul>
                        <ul className="flex space-x-4">
                            <li onClick={authContext.logout}><Link className={classes.loginLink} to="/login">Logout</Link></li>
                        </ul>
                    </>
                ) : (
                    <>
                        <ul className="flex space-x-4">
                            <li><Link className={classes.loginLink} to="/login">Login</Link></li>
                            <li><Link className={classes.registerLink} to="/register">Register</Link></li>
                        </ul>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
