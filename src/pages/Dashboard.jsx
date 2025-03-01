import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Home";
import Orders from "./Orders";
import Chat from "./Chat";

function Dashboard() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sidebar />}>
            <Route index element={<Home />} />
            <Route path="chat" element={<Chat />} />
            <Route path="order" element={<Orders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Dashboard;
