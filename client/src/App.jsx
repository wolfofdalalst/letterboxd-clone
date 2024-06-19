import { Route, Routes } from "react-router-dom"
import RegisterForm from "./pages/Register.jsx"
import LoginForm from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Navbar from "./components/Navbar.jsx"

import "./App.css";
import { useState } from "react"

function App() {
  let [isLogged, setIsLogged] = useState(false);

  return (
    <>
      <Navbar isLogged={isLogged}/>
      <Routes>
        <Route path="/" element={<Dashboard isLogged={isLogged} updateLogged={bool => {setIsLogged(bool)}}/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  )
}

export default App
