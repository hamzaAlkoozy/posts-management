import useConditionalRedirect from "../helpers/useConditionalRedirect";

function ListPosts() {
    useConditionalRedirect('/login', true);

    return (
        <div>List of posts</div>
    )
}

export default ListPosts;
