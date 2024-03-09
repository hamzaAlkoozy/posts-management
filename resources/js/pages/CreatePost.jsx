import React, {useRef, useEffect, useState} from 'react';
import useConditionalRedirect from '../helpers/useConditionalRedirect';
import {useNavigate} from "react-router-dom"

function CreatePost({ post }) {
    // TODO -hamza fix
    // useConditionalRedirect('/login', true);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const titleRef = useRef();
    const categoryRef = useRef();
    const publicationDateRef = useRef();
    const descriptionRef = useRef();

    // When modifying post - fill inputs with post values
    useEffect(() => {
        if (post) {
            console.log(post);
            titleRef.current.value = post.title;
            categoryRef.current.value = post.category;
            publicationDateRef.current.value = post.publication_date;
            descriptionRef.current.value = post.description;
        }
    }, [post]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const title = titleRef.current.value;
        const category = categoryRef.current.value;
        const publication_date = publicationDateRef.current.value;
        const description = descriptionRef.current.value;

        // Set the method and URL based on whether we're creating or editing a post
        const method = post ? 'PATCH' : 'POST';
        const url = post ? `/api/posts/${post.id}` : '/api/posts';

        try {
            const apiToken = localStorage.getItem('api-token');
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${apiToken}`
                },
                body: JSON.stringify({
                    title,
                    category,
                    publication_date,
                    description
                })
            });

            if (response.ok) {
                // If post is modified redirect ot i
                const data = await response.json();
                navigate(`/view-post/${data.id}`);
            } else {
                // Show error as message
                // TODO -hamza client side validation - take error messages from response and show them
                const data = await response.json();
                let errorString = '';
                if (data.errors) {
                    for (let field in data.errors) {
                        errorString += `${data.errors[field].join(', ')} \n`;
                    }
                } else if (data.message) {
                    errorString = data.message;
                }

                console.error('Post creation failed', data);
                setErrorMessage(errorString.trim());
            }
        } catch (error) {
            console.error('An error occurred while creating the post:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="w-1/2">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        ref={titleRef}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Category
                    </label>
                    <input
                        ref={categoryRef}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="category"
                        type="text"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publication_date">
                        Publication Date
                    </label>
                    <input
                        ref={publicationDateRef}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="publication_date"
                        type="date"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        ref={descriptionRef}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                    />
                </div>

                {errorMessage && (
                    <div className="bg-red-100 border mb-4 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
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
    );
}

export default CreatePost;
