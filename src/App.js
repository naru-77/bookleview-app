import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import BookReviews from "./components/BookReviews";
import UserProfile from "./components/UserProfile";
import { UserProvider } from "./components/UserProvider";
// import Header from "./components/Header";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reviews" element={<BookReviews />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
