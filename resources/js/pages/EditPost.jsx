import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import CreatePost from './CreatePost';
import useConditionalRedirect from "../helpers/useConditionalRedirect";
import {toast} from "react-toastify";

function EditPostPage() {
    useConditionalRedirect('/login', true);

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
                } else {
                    toast.error('Unable to edit the post. Please try again.', {
                        position: "top-center",
                        autoClose: 2000
                    });
                }
            } catch (error) {
                toast.error('Unable to edit the post. Please try again.', {
                    position: "top-center",
                    autoClose: 2000
                });
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
