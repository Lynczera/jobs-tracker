import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    <Home>
        <MainPage/>
    </Home>

    // <BrowserRouter>
    // <Routes>
    // <Route path="/" element={<Home />} />
    // </Routes>

    // </BrowserRouter>
  );
}

export default App;
