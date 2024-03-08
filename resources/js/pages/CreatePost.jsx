import React, { useRef } from 'react';
import useConditionalRedirect from '../helpers/useConditionalRedirect';
import {useNavigate} from "react-router-dom"

function CreatePost() {
    useConditionalRedirect('/login', true);

    const navigate = useNavigate();

    const titleRef = useRef();
    const categoryRef = useRef();
    const publicationDateRef = useRef();
    const descriptionRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const title = titleRef.current.value;
        const category = categoryRef.current.value;
        const publication_date = publicationDateRef.current.value;
        const description = descriptionRef.current.value;

        try {
            const apiToken = localStorage.getItem('api-token');
            const response = await fetch('/api/posts', {
                method: 'POST',
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
                // Post creation successful, navigate to list post
                navigate('/list-posts');
            } else {
                // Show error as message
                // TODO -hamza client side validation - take error messages from response and show them
                const data = await response.json();
                console.error('Post creation failed');
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
                        required="required"
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
                        required="required"
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
                        required="required"
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
                        required="required"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Create Post
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;
