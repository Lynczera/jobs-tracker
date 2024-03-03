import { useState } from "react";
import MainPage from "./MainPage";
import { Outlet, Link, Route,Router, useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Center,
  TextInput,
  PasswordInput,
  Text,
  Flex,
  Stack
} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';

function Home({children}) {
  const [isSignup, setIsSignup] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);
  const [user, setUser] = useState("Leo");
  const [password, setPassword] = useState("12345");

  const nav = useNavigate();

  function authenticate (){
    nav("/MainPage");
  }
  
  return (
  <>
      <Container
        size={"responsive"}
        mt={200}
        mx={300}
        bg="var(--mantine-color-blue-light)"
        p={50}
      >
        <Flex
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
        >
          <Text
            size="xl"
            fw={900}
          >
            {isSignup ? "Register" : "Login"}
          </Text>
          <TextInput
            label="Username"
            w={200}
          />

          {isSignup ? (
            <Stack>
              <PasswordInput
                label="Password"
                visible={visible}
                onVisibilityChange={toggle}
                w={200}
              />
              <PasswordInput
                label="Confirm password"
                visible={visible}
                onVisibilityChange={toggle}
                w={200}
              />
            </Stack>

          ) : (
            <PasswordInput
              label="Password"
              w={200}
            />
          )}

          <Button onClick={()=>authenticate()}>{isSignup? "Signup" : "Login"}</Button>
          <Button
            onClick={() => (isSignup ? setIsSignup(false) : setIsSignup(true))}
          >
            {isSignup ? "Member already" : "I'm new"}
          </Button>
        </Flex>
      </Container>
    </>
  );
}

export default Home;
