import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage/LoginPage";
import ChattingPage from "./Components/ChattingPage/ChattingPage";
import UserList from "./Components/UserListPage/UserList";
import Cookies from 'universal-cookie'

function Routing() {
    const cookies = new Cookies()
    const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
  return (
    <Router>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <Routes>
          <Route path="/" element={!isAuth? <LoginPage setIsAuth={setIsAuth} /> : <UserList setIsAuth={setIsAuth} />} />
          <Route path="/chat/:userId" element={<ChattingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Routing