import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CustomersStatsList from "./pages/CustomersStatsList";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers-stats" element={<CustomersStatsList />} />
      </Routes>
    </BrowserRouter>
  );
}
