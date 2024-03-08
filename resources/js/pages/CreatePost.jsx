import useConditionalRedirect from "../helpers/useConditionalRedirect";

function CreatePost() {
    useConditionalRedirect('/login', true);

    return (
        <div>Create post</div>
    )
}

export default CreatePost
