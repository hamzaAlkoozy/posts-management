import React, {useContext, useState} from "react";
import AuthContext from "../store/auth-context";
import {useNavigate} from "react-router-dom";
import useConditionalRedirect from "../helpers/useConditionalRedirect";
import * as Yup from 'yup';

const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
});

function Login() {
    useConditionalRedirect('/', false);

    const authContext = useContext(AuthContext);
    const navigate = useNavigate(); // Get the navigate function

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState(null);

    // client-side validation
    // TODO -hamza refactor - code is duplicated between components
    const validateInput = async (value, field) => {
        let obj = {};
        obj[field] = value;

        try {
            await schema.validateAt(field, obj); // validate the field
            setErrorMessage(''); // if validation is successful, clear the error message

            return true;
        } catch (err) {
            setErrorMessage(err.message); // if validation fails, set the error message

            return false;
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        // Only send request to API if client side validation succeed and no error messages found
        // If one has an error message, it will stop the execution and not call the API
        const notValidData =
            !(await validateInput(email, 'email')) ||
            !(await validateInput(password, 'password'));

        if (notValidData) {
            return; // return early if validation fails
        }

        const response = await fetch('api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Handle successful registration here
            console.log('Login successful:', data);
            localStorage.setItem('api-token', data.access_token); // Store the token
            authContext.login();
            navigate('/');
        } else {
            // Handle errors here
            console.log('Login failed:', data);
            let errorString = '';
            if (data.errors) {
                for (let field in data.errors) {
                    errorString += `${data.errors[field].join(', ')} \n`;
                }
            } else if (data.message) {
                errorString = data.message;
            }

            setErrorMessage(errorString.trim());
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleLogin} className="w-1/2">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateInput(e.target.value, 'email');
                        }}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validateInput(e.target.value, 'password');
                        }}
                    />
                </div>

                {errorMessage && (
                    <div className="bg-red-100 border mb-4 border-red-400 text-red-700 px-4 py-3 rounded relative"
                         role="alert">
                        <span className="block sm:inline">{errorMessage.split('\n').map((item, key) => {
                            return <span key={key}>{item}<br/></span>
                        })}</span>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login
