import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import SignUpPage from './pages/signUpPage'
import SignInPage from './pages/signInPage'
import Dashboard from './pages/dashboard'
import ProtectedRoute from './components/protectedRoute'
import axios from 'axios'
import HomePage from './pages/homepage'
import WriteBlog from './pages/writeblog'
import { Suspense } from 'react'
import ShowBlog from './pages/showBlog'
import PaginatedBlogs from './pages/paginatedBlogs'

function App() {
  
  axios.defaults.withCredentials = true;

  return (
    <div className= "min-h-screen min-w-screen text-black bg-white dark:border-sky-800 dark:text-slate-200 dark:bg-gradient-to-l dark:from-sky-900 dark:to-sky-950">
    <Suspense fallback={<div>Suspense Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignUpPage />} />
          <Route path="/auth">
            <Route index element={<SignInPage />} />
              <Route path="dashboard" element={
                                    <ProtectedRoute>
                                      <Dashboard />
                                    </ProtectedRoute>
              } />
              <Route path="writeblog" element={
                                    <ProtectedRoute>
                                      <WriteBlog />
                                    </ProtectedRoute>
              } />
              <Route path="blog" element={
                                    <ProtectedRoute>
                                      <ShowBlog />
                                    </ProtectedRoute>
              } />
              <Route path="paginatedBlogs/:searchName?" element={
                                    <ProtectedRoute>
                                      <PaginatedBlogs />
                                    </ProtectedRoute>
              } />
          </Route>
          <Route path="/home" element={<HomePage />}/>
        </Routes> 
      </BrowserRouter>
      </Suspense>
    </div>
  )
}

export default App
