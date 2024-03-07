// Navigation Component
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    const token = localStorage.getItem('token');

    return (
        <nav className="bg-blue-500 p-4 text-white">
            <ul className="flex space-x-4">
                <li><Link to="/create-post">Create Post</Link></li>
                <li><Link to="/list-posts">List Posts</Link></li>
                {!token && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
                {token && (
                    <li onClick={() => {
                        localStorage.removeItem('token');
                        window.location.reload();
                    }}>Logout</li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
