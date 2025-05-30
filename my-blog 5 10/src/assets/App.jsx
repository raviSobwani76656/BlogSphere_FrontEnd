import React from "react";
import Header from "./Header";
import SignupForm from "./Components/SignupForm";
import Home from "./Home";
import SigninForm from "./Components/SigninForm";
import PostcreatorForm from "./Components/PostcreatorForm";

import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/createpost" element={<PostcreatorForm />} />
      </Routes>
    </Router >

  );
}

export default App;
