// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import BookDetail from "./components/BookDetail";
import AllCategoriesPage from "./pages/AllCategories";
import StoryEngine from "./pages/StoryEngine";

import "./index.css";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/products/:id" element={<Layout><BookDetail /></Layout>} />
        <Route path="/categories" element={<AllCategoriesPage />} /> 
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/story" element={<Layout><StoryEngine /></Layout>} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);


