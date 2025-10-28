import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import SignIn from "./components/SignIn.jsx";
import TaskManager from "./components/TaskManager.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* App can be your layout or homepage */}
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="/tasks" element={<TaskManager />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
