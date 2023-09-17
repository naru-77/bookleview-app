import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import BookReviews from "./components/BookReviews";
import React, { useEffect, useContext, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import AuthContext from "./components/AuthContext";

function NavigationHandler() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/reviews");
    } else {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return null; // 何もレンダリングしない
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Router>
        <NavigationHandler />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reviews" element={<BookReviews />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
