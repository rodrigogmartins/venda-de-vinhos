import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomersList from "./pages/CustomersList";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomersList />} />
      </Routes>
    </BrowserRouter>
  );
}
