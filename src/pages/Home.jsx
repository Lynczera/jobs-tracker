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

  async function loginUser() {
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
    if (allFilled) {
      const  data  = await User.login_user(user, password);
      const {login} = data.data;

      if(login){
        nav('/MainPage');
      }else{
        setPassError("Wrong password or username");
        setUserError("Wrong password or username");

      }
      console.log(login);
    }
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
      const { data } = await User.create_user(user, password);
      console.log(data);

      if (data["created"]) {
        setIsSignup(false);
      } else {
        if (data["error"] === 1062) {
          setUserError("Username already exists");
        }
      }
    }
  }

  // async function checkSession() {
  //   console.log("testing cookie");
  //   const data = await User.auth_user();
  //   const { sID } = data.data;
  //   const { auth } = data.data;
  //   return auth;
  // }

  // async function testServer() {
  //   console.log("calling server");
  //   const {data} = await Auth.check_user();
  //   console.log(data);

  // }
  // async function testCookie() {
  //   console.log("testing cookie");
  //   const data = await User.auth_user();
  //   const {sID} = data.data;
  //   const {auth} = data.data;

  //   console.log(data.data);

    
  //   // console.log(cookie);    // const cookie = cookie.load('sID');
  // }


  return (

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

          <Button onClick={isSignup ? createUser : loginUser}>
            {isSignup ? "Signup" : "Login"}
          </Button>
          <Button onClick={switchUserMode}>
            {isSignup ? "Member already" : "I'm new"}
          </Button>
          {/* <Button onClick={testCookie}>
            Test Cookie
          </Button> */}
        </Flex>


  );
}

export default Home;
