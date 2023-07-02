import React from "react";
import "./CSS/style.css";
import "./App.css";
import "rsuite/dist/rsuite.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Display from "./components/display.jsx";
import SignUp from "./components/signup.jsx";
import SignIn from "./components/signin.jsx";
import HomePage from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/text" element={<Display />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
