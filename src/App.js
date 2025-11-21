import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Contacto from "./Contancto";
import Registro from "./Registro";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import MemberHome from "./MemberHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="registro" element={<Registro />} />
          <Route path="login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="panel" element={<MemberHome />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
