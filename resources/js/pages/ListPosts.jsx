import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import PostList from "../posts/PostList";
import {toast} from "react-toastify";

import {Helmet} from 'react-helmet';
import useConditionalRedirect from "../helpers/useConditionalRedirect";

function ListPostsPage() {
    useConditionalRedirect('/login', true);

    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('page');
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(Number(page) || 1);
    const [totalPages, setTotalPages] = useState(0);

    // Handle when user sort, search, or paginate
    function handleSearch(field, newValue) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(field, newValue);

        setSearchParams(newSearchParams);

    }

    useEffect(() => {
        setCurrentPage(Number(page) || 1);
    }, [page]);

    // Fetch posts from API
    useEffect(() => {
        setIsLoading(true);

        const fetchPosts = async () => {
            try {
                const apiToken = localStorage.getItem('api-token');
                const response = await fetch(`/api/posts?${searchParams}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${apiToken}`
                    },
                });

                if (response.ok) {
                    // Post creation successful, navigate to list post
                    const data = await response.json();
                    setPosts(data.data);
                    setCurrentPage(data.current_page);
                    setTotalPages(data.last_page);
                    setIsLoading(false);
                } else {
                    toast.error('Unable to fetch posts. Please try again.', {
                        position: "top-center",
                        autoClose: 2000
                    });
                }
            } catch (error) {
                toast.error('Unable to fetch posts. Please try again.', {
                    position: "top-center",
                    autoClose: 2000
                });
            }
        }

        fetchPosts();

    }, [searchParams]);

    return (
        <>
            <Helmet>
                <title>List Posts</title>
            </Helmet>

            <div className={` mb-4 w-1/2 mx-auto grid grid-cols-6 gap-2`}>
                <div className="col-span-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Search
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={e => handleSearch('search', e.target.value)}
                    />
                </div>
                <div className="col-span-2">
                    <div className="col-span-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Sort
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={e => handleSearch('sort', e.target.value)}>
                            <option value='default'>Default</option>
                            <option value='title'>Title (A-Z)</option>
                            <option value='publication_date'>Date (latest)</option>
                        </select>
                    </div>
                </div>
            </div>
            {!isLoading ? (
                    posts.length > 0 ?
                        <>
                            <PostList posts={posts}/>

                            <button
                                onClick={() => handleSearch('page', currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`mx-2 text-white py-2 px-4 rounded ${currentPage === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => handleSearch('page', currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`mx-2 text-white py-2 px-4 rounded ${currentPage === totalPages ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
                            >
                                Next
                            </button>
                        </>
                        :

                        <div>
                            <p>There are no posts</p>
                        </div>
                )
                :
                <p className="mx-auto">Loading ....</p>
            }
        </>
    );

}

export default ListPostsPage;
