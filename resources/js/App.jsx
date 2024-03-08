import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './layout/Layout';
import CreatePost from './pages/CreatePost';
import ListPosts from './pages/ListPosts';
import Login from './pages/Login';
import Register from './pages/Register';

import {AuthContextProvider} from "./store/auth-context";

import NotFound from './pages/NotFound';

function App() {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/create-post" element={<CreatePost/>}/>
                        <Route path="/list-posts" element={<ListPosts/>}/>
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
