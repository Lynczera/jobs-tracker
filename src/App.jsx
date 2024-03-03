import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import MainPage from "./pages/MainPage.jsx";

// import {
//   Container,
//   Button,
//   Center,
//   TextInput,
//   PasswordInput,
//   Text,
//   Flex,
//   Stack
// } from "@mantine/core";
// import { useDisclosure } from '@mantine/hooks';

function App() {
  return (
    // <Home> </Home>

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
