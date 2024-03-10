import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthContext from "../store/auth-context";
import useConditionalRedirect from "../helpers/useConditionalRedirect";
import * as Yup from 'yup';
import {toast} from "react-toastify";
import Card from "../ui/Card";
import {Helmet} from "react-helmet";
import FormInput from "../ui/FormInput";
import ErrorMessage from "../ui/ErrorMessage";

// TODO -hamza fix password confirmation not working
const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
    passwordConfirmation: Yup.string().min(8).required(),
    // passwordConfirmation: Yup.string()
    //     .oneOf([Yup.ref('password'), null], 'Passwords must match')
    //     .required(),
});


function Register() {
    useConditionalRedirect('/', false);

    const authContext = useContext(AuthContext);
    const navigate = useNavigate(); // Get the navigate function

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
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


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Only send request to API if client side validation succeed and no error messages found
        // If one has an error message, it will stop the execution and not call the API
        const notValidData =
            !(await validateInput(name, 'name')) ||
            !(await validateInput(email, 'email')) ||
            !(await validateInput(password, 'password')) ||
            !(await validateInput(passwordConfirmation, 'passwordConfirmation'));

        if (notValidData) {
            return; // return early if validation fails
        }

        try {
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
                localStorage.setItem('api-token', data.access_token); // Store the token
                authContext.login();

                // Send successful message
                toast.success('Registration successful! You are now logged in.', {
                    position: "top-center",
                    autoClose: 2000
                });

                navigate('/');
            } else {
                // Handle errors here
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
        } catch (error) {
            toast.error('Registration failed, Please try again later', {
                position: "top-center",
                autoClose: 2000
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Register new user</title>
            </Helmet>
            <Card className="w-full sm:w-1/2 mx-auto">
                <div className="flex flex-col justify-center bg-gray-100">
                    <h1 className="text-center text-2xl font-bold mb-4">Register account</h1>
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                validateInput(e.target.value, 'name');
                            }}
                            label="Name"
                        />
                        <FormInput
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                validateInput(e.target.value, 'email');
                            }}
                            label="Email"
                        />
                        <FormInput
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validateInput(e.target.value, 'password');
                            }}
                            label="Password"
                        />
                        <FormInput
                            id="passwordConfirmation"
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => {
                                setPasswordConfirmation(e.target.value);
                                validateInput(e.target.value, 'passwordConfirmation');
                            }}
                            label="Confirm Password"
                        />

                        {errorMessage && <ErrorMessage message={errorMessage}/>}

                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </Card>
        </>
    );
}

export default Register;
