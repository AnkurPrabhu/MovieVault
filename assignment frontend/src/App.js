import "./App.css";
import { Navbarcompo, SearchView, Watched, Watchlist } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import Login from "./components/login";

function App() {
  return (
    <Router>
      <Navbarcompo />

      <Routes>
        <Route path="/Search" exact element={<SearchView />} />
        <Route path="/login" exact element={<Login />} />

        <Route path="/watched" exact element={<Watched />} />

        <Route path="/watchlist" exact element={<Watchlist />} />
      </Routes>
    </Router>
  );
}

export default App;
