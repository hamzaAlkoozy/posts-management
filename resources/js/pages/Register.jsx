import React, {useContext, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../store/auth-context";
import useConditionalRedirect from "../helpers/useConditionalRedirect";

function Register() {
    useConditionalRedirect('/', false);

    const authContext = useContext(AuthContext);
    const navigate = useNavigate(); // Get the navigate function

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirmation = passwordConfirmationRef.current.value;

        const response = await fetch('api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Handle successful registration here
            console.log('Registration successful:', data);
            localStorage.setItem('api-token', data.access_token); // Store the token
            authContext.login();
            navigate('/');
        } else {
            // Handle errors here
            console.log('Registration failed:', data);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="w-1/2">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        ref={nameRef}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        ref={emailRef}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        ref={passwordRef}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordConfirmation">
                        Confirm Password
                    </label>
                    <input
                        ref={passwordConfirmationRef}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="passwordConfirmation"
                        type="password"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
