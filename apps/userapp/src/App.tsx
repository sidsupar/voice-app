import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/signUpPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
