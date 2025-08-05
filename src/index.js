import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import BookDetail from "./components/BookDetail";
import AllCategoriesPage from "./pages/AllCategories";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
  <Route path="/" element={<Layout><HomePage /></Layout>} />
  <Route path="/products/:id" element={<Layout><BookDetail /></Layout>} />
  <Route path="/categories" element={<AllCategoriesPage />} /> 
  <Route path="/books/:id" element={<BookDetail />} />
</Routes>
  </BrowserRouter>
);


