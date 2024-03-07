import {
  Button,
  Flex,
  Modal,
  Title,
  Grid,
  Text,
  TextInput,
  Table,
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

  const [jID_err, setjID_err] = useState(null);

  const [appStatus, setappStatus] = useState("");

  const [applications, setApps] = useState([]);

  async function authenticate() {
    const data = await User.auth_user();
    const { auth, user } = data.data;
    if (!auth) {
      nav("/");
    } else {
      setUser(user);
      updateApps();
    }
  }

  async function updateApps() {
    const data = Application.get_apps();
    Application.get_apps().then((response) => {
      setApps(response);
    });
  }

  async function logout() {
    const logout = await User.logout_user();
    if (logout) {
      nav("/");
    } else {
      console.log("logout failed");
    }
  }

  function closeModal() {
    close();
    setjID_err(null);
  }

  async function addApp() {
    const data = await Application.add_app(jobID, appDate, appStatus);
    const { title, company } = await data;
    if (title) {
      close();
      setjID_err(null);
      updateApps();
    } else {
      setjID_err("Job doesn't exist");
    }
  }

  useEffect(() => {
    authenticate();
  }, [location]);

  // useEffect(()=>{
  //   const data = Application.get_apps();
  //   Application.get_apps().then((response)=>{
  //     setApps(response);
  //   })
  // },[]);

  const rows = applications.map((element) => (
    <Table.Tr key={element.JobID}>
      <Table.Td>{element.JobID}</Table.Td>
      <Table.Td>{element.Date.split("T")[0]}</Table.Td>
      <Table.Td>{element.Title}</Table.Td>
      <Table.Td>{element.Company}</Table.Td>
      <Table.Td>{element.Status}</Table.Td>
    </Table.Tr>
  ));

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
          onClose={closeModal}
          title="Add Application"
        >
          <TextInput
            label="Job ID"
            withAsterisk
            error={jID_err}
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

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Job ID</Table.Th>
              <Table.Th>Date Applied</Table.Th>
              <Table.Th>Job Title</Table.Th>
              <Table.Th>Company</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Flex>
    </div>
  );
}
