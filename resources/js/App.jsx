import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './layout/Layout';
import CreatePost from './pages/CreatePost';
import ListPostsPage from './pages/ListPosts';
import Login from './pages/Login';
import Register from './pages/Register';

import {AuthContextProvider} from "./store/auth-context";

import NotFound from './pages/NotFound';
import ViewPostPage from "./pages/ViewPost";
import EditPostPage from "./pages/EditPost";

function App() {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/list-posts" element={<ListPostsPage/>}/>
                        <Route path="/create-post" element={<CreatePost/>}/>
                        <Route path="/view-post/:id" element={<ViewPostPage/>}/>
                        <Route path="/edit-post/:id" element={<EditPostPage/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/" element={<div><h1>Welcome Admin</h1></div>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </AuthContextProvider>
    );
}

export default App;
