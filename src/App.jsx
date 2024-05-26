import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import MainPage from "./pages/MainPage.jsx";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Home />}
        />
        <Route
          path="MainPage"
          element={<MainPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
