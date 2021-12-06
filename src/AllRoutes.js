import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./component/Main";
import Home from "./component/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Post from "./market/Post";
import Chat from "./market/Chat";
import Notfound from "./component/404";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/post" element={<Post />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};

export default AllRoutes;
