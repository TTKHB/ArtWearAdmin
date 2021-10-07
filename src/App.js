import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import MainDrawer from "./Navigator/MainDrawer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductRouter from "./Router/ProductRouter";

function App() {
  return (
    <div>
      <Router>
        {/* xử lý login vs main trong đây */}

        <MainDrawer />
      </Router>
    </div>
  );
}

export default App;
