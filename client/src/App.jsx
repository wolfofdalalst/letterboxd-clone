import { Route, Routes } from "react-router-dom"
import RegisterForm from "./pages/Register.jsx"
import LoginForm from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Navbar from "./components/Navbar.jsx"
import { useState } from "react"

import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

// TODO: implement react spinners
// BUG: upon reloading the state loginStatus is set to its default value, false

function App() {
  let [loginStatus, setLoginStatus] = useState(false);

  const updateLoginStatus = value => { setLoginStatus(value); }

  return (
    <>
      <Navbar loginStatus={loginStatus} updateLoginStatus={updateLoginStatus} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm updateLoginStatus={updateLoginStatus} />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
      {/* TODO: create footer */}
    </>
  )
}

export default App
