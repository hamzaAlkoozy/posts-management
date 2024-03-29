import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './layout/Layout';
import CreatePost from './pages/CreatePost';
import ListPostsPage from './pages/ListPosts';
import LoginPage from './pages/Login';
import Register from './pages/Register';

import {AuthContextProvider} from "./store/auth-context";

import NotFound from './pages/NotFound';
import ViewPostPage from "./pages/ViewPost";
import EditPostPage from "./pages/EditPost";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                    <ToastContainer />
                </Layout>
            </BrowserRouter>
        </AuthContextProvider>
    );
}

export default App;
