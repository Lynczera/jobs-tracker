import { useState } from "react";
import axios from "axios";
import MainPage from "./MainPage";
import { Outlet, Link, Route, Router, useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Center,
  TextInput,
  PasswordInput,
  Text,
  Flex,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import User from "../api/user";

function Home({ children }) {
  const [isSignup, setIsSignup] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userError, setUserError] = useState(null);
  const [passError, setPassError] = useState(null);
  const [confPassError, setConfPassError] = useState(null);

  const nav = useNavigate();

  function switchUserMode() {
    isSignup ? setIsSignup(false) : setIsSignup(true);
    setUserError(null);
    setPassError(null);
    setConfPassError(null);
  }

  async function authenticate() {
    setUserError(null);
    setPassError(null);
    setConfPassError(null);
    var allFilled = true;
    if (!user) {
      setUserError("Username required");
      allFilled = false;
    }
    if (!password) {
      setPassError("Password required");
      allFilled = false;
    }
    if(allFilled){
      console.log("All filled");
    }
    // console.log("Authenticating");
    // console.log("calling server");
    // const { data } = await User.check_user();
    // console.log(data);
  }

  async function createUser() {
    setUserError(null);
    setPassError(null);
    setConfPassError(null);
    var allFilled = true;
    if (!user) {
      setUserError("Username required");
      allFilled = false;
    }
    if (!password) {
      setPassError("Password required");
      allFilled = false;
    }
    if (!confirmPassword) {
      setConfPassError("Confirm Password");
      allFilled = false;
    }
    if (password != confirmPassword) {
      setPassError("Passwords must match");
      setConfPassError("Passwords must match");
      allFilled = false;
    }

    if (allFilled) {
      const { data } = await User.create_user(user);
      console.log(data);
    }
  }

  // async function testServer() {
  //   console.log("calling server");
  //   const {data} = await Auth.check_user();
  //   console.log(data);

  // }

  return (
    <>
      {/* <Container
        size={"responsive"}
        mt={200}
        mx={300}
        bg="var(--mantine-color-blue-light)"
        p={50}
      > */}
      <Flex
        mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
        mt={200}
      >
        <Text
          size="xl"
          fw={900}
        >
          {isSignup ? "Register" : "Login"}
        </Text>
        <TextInput
          label="Username"
          withAsterisk
          w={200}
          error={userError}
          onChange={(e) => setUser(e.target.value)}
        />

        {isSignup ? (
          <Stack>
            <PasswordInput
              error={passError}
              withAsterisk
              label="Password"
              visible={visible}
              onVisibilityChange={toggle}
              onChange={(e) => setPassword(e.target.value)}
              w={200}
            />
            <PasswordInput
              error={confPassError}
              withAsterisk
              label="Confirm password"
              visible={visible}
              onVisibilityChange={toggle}
              onChange={(e) => setConfirmPassword(e.target.value)}
              w={200}
            />
          </Stack>
        ) : (
          <PasswordInput
            withAsterisk
            label="Password"
            error={passError}
            onChange={(e) => setPassword(e.target.value)}
            w={200}
          />
        )}

        <Button onClick={isSignup ? createUser : authenticate}>
          {isSignup ? "Signup" : "Login"}
        </Button>
        <Button onClick={switchUserMode}>
          {isSignup ? "Member already" : "I'm new"}
        </Button>
      </Flex>
      {/* </Container> */}
    </>
  );
}

export default Home;
