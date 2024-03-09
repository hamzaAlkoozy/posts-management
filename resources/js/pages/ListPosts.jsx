import useConditionalRedirect from "../helpers/useConditionalRedirect";
import {useEffect, useState} from "react";
import PostList from "../posts/PostList";

function ListPostsPage() {
    useConditionalRedirect('/login', true);

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch posts from API
    useEffect(() => {
        setIsLoading(true);

        const fetchPosts = async () => {
            try {
                const apiToken = localStorage.getItem('api-token');
                const response = await fetch('/api/posts', {
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
                    setPosts(data);
                    setIsLoading(false);
                } else {
                    const data = await response.json();
                    // TODO -hamza client side validation - take error messages from response and show them
                    // console.error('Error fetching posts data');
                    console.error(data);
                }
            } catch (error) {
                console.error('Error fetching posts data:', error);
            }
        }

        fetchPosts();

    }, []);

    if (isLoading) {
        return (
            <div>
                <p>Loading.....</p>
            </div>
        );
    } else {
        return <PostList posts={posts} />;
    }

}

export default ListPostsPage;
