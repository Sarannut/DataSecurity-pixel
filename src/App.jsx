import React, { useRef, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // ใช้ Routes แทน Router
import Home from "./component/home";
import Member from "./component/member";
import Rsa from "./component/rsa";
import Header from "./component/header";

const App = () => {
  return (
    <Router>
      <Header /> {/* เรียกใช้ส่วนหัว */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member" element={<Member />} />
        <Route path="/rsa" element={<Rsa />} />
      </Routes>
    </Router>
  );
};

export default App;
