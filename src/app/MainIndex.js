import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginIndex from "./pages/login";
import SignUpIndex from "./pages/signUp";
import Header from "./common/component/Header";

function MainIndex() {
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  const ProtectedRoute = ({ element, path }) => {
    return isAuthenticated() ? (
      element
    ) : (
      <Navigate to="/" replace state={{ from: path }} />
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginIndex />} />
        <Route path="/signup" element={<SignUpIndex />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Header />} path="/profile" />}
        />
      </Routes>
    </Router>
  );
}

export default MainIndex;
