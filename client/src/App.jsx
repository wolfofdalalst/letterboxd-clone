import { Route, Routes } from "react-router-dom"
import RegisterForm from "./pages/Register.jsx"
import LoginForm from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  )
}

export default App
