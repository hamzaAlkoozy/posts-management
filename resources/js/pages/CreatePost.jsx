import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom"
import * as Yup from 'yup';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from "../ui/Card";
import {Helmet} from "react-helmet";

const schema = Yup.object().shape({
    title: Yup.string().required(),
    category: Yup.string().required(),
    publicationDate: Yup.date().required(),
    description: Yup.string().required(),
    image: Yup.mixed().required().test(
        "fileSize",
        "File too large",
        value => value && value.size <= 2048 * 1024 // 2MB
    ).test(
        "fileFormat",
        "Unsupported Format",
        value => value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type)
    )
});


function CreatePost({post}) {
    // TODO -hamza fix
    // useConditionalRedirect('/login', true);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();


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

    // When modifying post - fill inputs with post values
    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setCategory(post.category);
            setPublicationDate(post.publication_date);
            setDescription(post.description);
        }
    }, [post]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Only send request to API if client side validation succeed and no error messages found
        // If one has an error message, it will stop the execution and not call the API
        const notValidData =
            !(await validateInput(title, 'title')) ||
            !(await validateInput(category, 'category')) ||
            !(await validateInput(publicationDate, 'publicationDate')) ||
            !(await validateInput(description, 'description'));

        if (notValidData) {
            return; // return early if validation fails
        }

        const postFormData = new FormData();
        postFormData.append('title', title);
        postFormData.append('category', category);
        postFormData.append('publication_date', publicationDate);
        postFormData.append('description', description);

        if (post) {
            postFormData.append('_method', 'PATCH');
        }
        // image is optional
        if (image) {
            postFormData.append('image', image);
        }

        // Set the method, URL, success message based on whether we're creating or editing a post
        // TODO -hamza need refactoring LATER
        const method = 'POST';
        const url = post ? `/api/posts/${post.id}` : '/api/posts';
        const successMessage = post ? 'Post updated successfully!' : 'Post created successfully!';
        const errorMessage = post ? 'Unable to create the post. Please try again.' : 'Unable to update the post. Please try again.';

        try {
            const apiToken = localStorage.getItem('api-token');
            const response = await fetch(url, {
                method: method,
                headers: {
                    // Content type is by default to multipart/form-data because we are using FormData
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${apiToken}`
                },
                body: postFormData
            });

            if (response.ok) {
                const data = await response.json();

                // Send successful message
                toast.success(successMessage, {
                    position: "top-center",
                    autoClose: 2000
                });

                navigate(`/view-post/${data.id}`);
            } else {
                // Show error as message
                const data = await response.json();
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
            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 2000
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>{post ? 'Update Post' : 'Create Post'}</title>
            </Helmet>
            <Card className="w-full lg:w-3/4 mx-auto">
                <div className="flex flex-col justify-center bg-gray-100">
                    <h1 className="text-center text-2xl font-bold mb-4">
                        {post ? 'Update Post' : 'Create Post'}
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                Title
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    validateInput(e.target.value, 'title');
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                                Category
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="category"
                                type="text"
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                    validateInput(e.target.value, 'category');
                                }}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publication_date">
                                Publication Date
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="publication_date"
                                type="date"
                                value={publicationDate}
                                onChange={(e) => {
                                    setPublicationDate(e.target.value);
                                    validateInput(e.target.value, 'publicationDate');
                                }}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publication_date">
                                Thumbnail
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="image"
                                type="file"
                                onChange={(e) => {
                                    setImage(e.target.files[0]);
                                    validateInput(e.target.files[0], 'image');
                                }}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    validateInput(e.target.value, 'description');
                                }}
                            />
                        </div>

                        {errorMessage && (
                            <div
                                className="text-sm bg-red-100 border mb-4 border-red-400 text-red-700 px-3 py-2 rounded relative"
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
                                {post ? 'Update Post' : 'Create Post'}
                            </button>
                        </div>
                    </form>
                </div>
            </Card>
        </>
    );
}

export default CreatePost;
