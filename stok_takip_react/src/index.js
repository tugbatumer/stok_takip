import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Writers from "./pages/Writers";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Not_Logined from "./pages/not_logined";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
    <Route path = "/" element={<Dashboard />} />
        <Route path = "books" element = {<Books/>} />
        <Route path = "/writers" element = {<Writers/>} />
          <Route path = "login" element = {<Login/>} />
        <Route path = "/register" element = {<Register/>} />
          <Route path = "/logout" element = {<Not_Logined/>} />
          </Routes>
  </BrowserRouter>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
