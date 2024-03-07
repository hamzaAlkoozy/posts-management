import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import CreatePost from './pages/CreatePost';
import ListPosts from './pages/ListPosts';
import Login from './pages/Login';
import Register from './pages/Register';

// TODO -hamza later
// import Logout from './Logout';
import NotFound from './pages/NotFound';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/list-posts" element={<ListPosts />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/*<Route path="/logout" element={<Logout />} />*/}
                    <Route path="/" element={<div><h1>React.js and Vite are installed and running successfully with Laravel</h1></div>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
