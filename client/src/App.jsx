import { Route, Routes } from "react-router-dom"
import loginForm from "./components/loginForm"
import registerForm from "./components/registerForm"

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Hello World</h1>} />
      <Route path="/login" element={loginForm} />
      <Route path="/register" element={registerForm} />
    </Routes>
  )
}

export default App
