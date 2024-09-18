import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import AboutPage from './components/about'
import Login from './components/onboarding/Login'
import Register from './components/onboarding/Register'
import RequireAuth from './components/onboarding/RequireAuth'
import Posts from './components/posts';
import PostDetails from './components/postDetails';
import EditPost from './components/editpost';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="about" element={<AboutPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<RequireAuth />}>
            <Route index element={<Posts />} />
            <Route path="posts">
              <Route path=":postId" element={<PostDetails />} />
              <Route path="edit" element={<EditPost />} />
              <Route path="edit/:postId" element={<EditPost />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
