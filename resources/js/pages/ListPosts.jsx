import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import PostList from "../posts/PostList";

function ListPostsPage() {
    // TODO -hamza fix
    // useConditionalRedirect('/login', true);
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(Number(page) || 1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        setCurrentPage(Number(page) || 1);
    }, [page]);

    // Fetch posts from API
    useEffect(() => {
        setIsLoading(true);

        const fetchPosts = async () => {
            try {
                const apiToken = localStorage.getItem('api-token');
                const response = await fetch(`/api/posts?page=${currentPage}`, {
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
                    const data = await response.json();
                    // TODO -hamza client side validation - take error messages from response and show them
                    console.error(data);
                }
            } catch (error) {
                console.error('Error fetching posts data:', error);
            }
        }

        fetchPosts();

    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        navigate(`?page=${newPage}`)
    }

    if (isLoading) {
        return (
            <div>
                <p>Loading.....</p>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div>
                <p>There are no posts</p>
            </div>
        );
    }

    return (
        <>
            <PostList posts={posts}/>

            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`mx-2 text-white py-2 px-4 rounded ${currentPage === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
            >
                Previous
            </button>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`mx-2 text-white py-2 px-4 rounded ${currentPage === totalPages ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
            >
                Next
            </button>
        </>
    );

}

export default ListPostsPage;
