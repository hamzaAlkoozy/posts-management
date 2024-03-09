import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import NotFound from "./NotFound";
import PostItem from "../posts/PostItem";
import useConditionalRedirect from "../helpers/useConditionalRedirect";
import {toast} from "react-toastify";

const ViewPostPage = () => {
    // TODO -hamza fix
    // useConditionalRedirect('/login', true);

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    // Logic
    useEffect(() => {
        setIsLoading(true);

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
                    setNotFound(true);
                }
            } catch (error) {
                toast.error('Unable to fetch post. Please try again.', {
                    position: "top-center",
                    autoClose: 2000
                });
            }
        }

        getPost();

    }, [id]);

    if (notFound) {
        return <NotFound/>;
    }
    // View
    if (isLoading) {
        // TODO -hamza show spinner instead
        return <div>Loading...</div>;
    }

    return (
        <PostItem item={post} showViewButton={false} showDescription={true}/>
    );
};

export default ViewPostPage;
