import { BrowserRouter as Router, Routes, Route, createBrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css'
import Home from "./pages/Home";
import Navbar from "./components/Nav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SingleProduct from "./pages/singleProduct";
import CategoryProducts from "./pages/Category";
import AddProduct from "./pages/addProduct";
import UpdateProduct from "./pages/updateProduct";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollTop";
import AboutPage from "./pages/About";
import Details from "./pages/Details";

export default function App() {
 
  return (
    <Router>
      <Navbar/>
       <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<CategoryProducts/>}/>
        <Route path="/add" element={<AddProduct/>}/>
        <Route path="/update/:id" element={<UpdateProduct/>}/>
        <Route path="/:id" element={<SingleProduct />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/details/:id" element={<Details/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}