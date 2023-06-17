import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./home-pages/home";
import { Login } from "./pages/login";
import { Navbar } from "./components/Navbar";
import {Createpost} from './createposts/createpost'
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createpost" element={<Createpost/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
