import {
  Button,
  Flex,
  Modal,
  Title,
  Grid,
  Text,
  TextInput,
} from "@mantine/core";
import { Container } from "@mantine/core";
import { useEffect, useState } from "react";
import User from "../api/user";
import { useLocation, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

import { DateInput } from "@mantine/dates";
import Application from "../api/application";

export default function MainPage() {
  const nav = useNavigate();
  const location = useLocation();

  const [opened, { open, close }] = useDisclosure(false);

  const [user, setUser] = useState("");

  const [appDate, setappDate] = useState(null);
  const [jobID, setjobID] = useState("");

  const [appStatus, setappStatus] = useState("");


  async function authenticate() {
    const data = await User.auth_user();
    const { auth, user } = data.data;
    if (!auth) {
      nav("/");
    }
    setUser(user);
  }

  async function logout() {
    const logout = await User.logout_user();
    if (logout) {
      nav("/");
    } else {
      console.log("logout failed");
    }
  }

  async function addApp() {
    close();
    const data = await Application.add_app()

  }

  useEffect(() => {
    authenticate();
  }, [location]);

  return (
    <div>
      <Grid grow>
        <Grid.Col span={1}>
          <Flex
            m={10}
            gap="md"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Text size="lg">{`Hello ${user}`}</Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={1}>
          <Flex
            gap="md"
            justify="flex-end"
            align="center"
            direction="row"
            wrap="wrap"
            m={10}
          >
            <Button onClick={open}>Add Application</Button>
            <Button onClick={logout}>Logout</Button>
          </Flex>
        </Grid.Col>
      </Grid>

      <Flex
        mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Title order={2}>Jobs Tracker</Title>

        <Modal
          opened={opened}
          onClose={close}
          title="Add Application"
        >
          <TextInput
            label="Job ID"
            withAsterisk
            onChange={(e) => setjobID(e.target.value)}
          />

          <DateInput
            withAsterisk
            value={appDate}
            onChange={setappDate}
            label="Date"
          />

          <TextInput
            label="Status"
            onChange={(e) => setappStatus(e.target.value)}
          />

          <Button
            mt={10}
            onClick={addApp}
          >
            Submit
          </Button>
        </Modal>
      </Flex>
    </div>
  );
}
