import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Button, Container, Center } from "@mantine/core";

function App() {
  return (
    <>
      <Center
        m={"auto"}
        bg="var(--mantine-color-blue-light)"
        w={700}
        h={700}
      >
        <Button variant="filled" color="pink">
          Button
        </Button>
      </Center>
    </>
  );
}

export default App;
