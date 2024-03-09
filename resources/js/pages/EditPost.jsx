import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import CreatePost from './CreatePost';
import useConditionalRedirect from "../helpers/useConditionalRedirect";

function EditPostPage() {
    // TODO -hamza fix
    // useConditionalRedirect('/login', true);

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsLoading(true);

        // Fetch the post data from your API
        const getPost = async () => {
            try {
                const apiToken = localStorage.getItem('api-token');
                const response = await fetch(`/api/posts/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${apiToken}`
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setPost(data);
                    setIsLoading(false);
                    // TODO -hamza return to view post page
                } else {
                    // Show error as message
                    // TODO -hamza client side validation - take error messages from response and show them
                    const data = await response.json();
                    console.error('Post edit failed', data);
                }
            } catch (error) {
                console.error('An error occurred while creating the post:', error);
            }
        }

        getPost();

    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <CreatePost post={post} />;
}

export default EditPostPage;
