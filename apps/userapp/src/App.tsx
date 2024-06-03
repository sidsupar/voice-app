import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/signUpPage';
import SignInPage from './pages/signInPage';
import Dashboard from './pages/dashboard';
import ProtectedRoute from './components/protectedRoute';
import axios from 'axios';
import HomePage from './pages/homepage';
import WriteBlog from './pages/writeblog';
import { Suspense } from 'react';
import ShowBlog from './pages/showBlog';
import PaginatedBlogs from './pages/paginatedBlogs';
import Appbar from './components/appbar';
import { PingLoader } from "@repo/ui/ping-loader";

function App() {
  
  axios.defaults.withCredentials = true;

  return (
    <div className= "min-h-screen min-w-screen text-black bg-white dark:border-sky-800 dark:text-slate-200 dark:bg-gradient-to-l dark:from-sky-900 dark:to-sky-950">
    <Suspense fallback={<PingLoader />}>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignUpPage />} />
          <Route path="login" element={<SignInPage />} />
          <Route path="/auth">
            <Route element={<ProtectedRoute />}>
              <Route element={<Appbar />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="writeblog" element={<WriteBlog />} />
                <Route path="blog" element={<ShowBlog />} />
                <Route path="paginatedBlogs/:searchName?" element={<PaginatedBlogs />} />
              </Route>
            </Route>              
          </Route>
          <Route path="/home" element={<HomePage />}/>
        </Routes> 
      </BrowserRouter>
      </Suspense>
    </div>
  )
}

export default App
