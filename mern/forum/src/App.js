import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./components/home";
import Readmore from "./components/readMore";
import Login from "./components/login";
import Signup from "./components/sigiup";
import Mypost from "./components/mypost";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/readmore/:id" element={<Readmore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/mypost" element={<Mypost/>}/>
      </Routes>
    </BrowserRouter>
  );
}