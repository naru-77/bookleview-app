import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import BookReviews from "./components/BookReviews";
import UserProfile from "./components/UserProfile";
import { UserProvider } from "./components/UserProvider";
import NewBookReview from "./components/NewBookReview";
import BookDetail from "./components/BookDetail";
import BookEdit from "./components/BookEdit";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reviews" element={<BookReviews />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/new" element={<NewBookReview />} />
          <Route path="/detail/:id" element={<BookDetail />} />
          <Route path="/edit/:id" element={<BookEdit />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
