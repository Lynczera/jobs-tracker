import { useState } from "react";
import { Outlet, Link, Route,Router } from "react-router-dom";
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

  const [ isAuth, setAuth ] = useState(false);

  
  return (!isAuth?
    (<>
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

          <Button onClick={()=>setAuth(true)}>{isSignup? "Signup" : "Login"}</Button>
          <Button
            onClick={() => (isSignup ? setIsSignup(false) : setIsSignup(true))}
          >
            {isSignup ? "Member already" : "I'm new"}
          </Button>
        </Flex>
      </Container>
    </>):(<div>{children}</div>)
  );
}

export default Home;
