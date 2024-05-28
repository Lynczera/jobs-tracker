import {
  Button,
  Flex,
  Modal,
  Title,
  Grid,
  Text,
  TextInput,
  Table,
  Checkbox,
  Input,
} from "@mantine/core";
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
  const [jobID, setjobID] = useState(null);

  const [jID_err, setjID_err] = useState(null);
  const [date_err, setdate_err] = useState(null);

  const [appStatus, setappStatus] = useState("");

  const [applications, setApps] = useState([]);

  const [removing, setRemoving] = useState(false);
  const [toRemove, setToRemoving] = useState([]);

  const [isEditing, setisEditing] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);

  const [editStatus, seteditStatus] = useState("");

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
    setdate_err(null);
    setappDate(null);
    setjobID(null);
    setappStatus(null);
  }

  async function addApp() {
    setjID_err(null);
    setdate_err(null);
    var allfilled = true;
    if (!jobID || jobID.trimEnd() == "") {
      setjID_err("Job ID required");
      allfilled = false;
    }
    if (!appDate) {
      setdate_err("Date required");
      allfilled = false;
    }

    if (allfilled) {
      const data = await Application.add_app(jobID, appDate, appStatus);
      const { title } = await data;
      if (title) {
        closeModal();
        updateApps();
      } else {
        setjID_err("Job doesn't exist");
      }
    }
  }

  useEffect(() => {
    authenticate();
  }, [location]);

  function startRmv() {
    if (removing) {
      setRemoving(false);
      setToRemoving([]);
    } else {
      setRemoving(true);
    }
  }

  async function removeApps() {
    setRemoving(false);
    setToRemoving([]);
    if (toRemove.length > 0) {
      const data = await Application.remove_apps(toRemove);
      if (data == "removed") {
        updateApps();
      } else {
        console.log(data);
      }
    }
  }

  function startEdit(ele, curr_status) {
    setisEditing(true);
    setSelectedRow(ele);
    seteditStatus(curr_status);
  }

  async function updateApp(job) {
    console.log("updating")
    setisEditing(false);
    const data = await Application.update_apps(job, editStatus);
    console.log(data)
    if (data) {
      updateApps();
    }
  }

  const rows = applications.map((element) => (
    <Table.Tr key={element.JobID}>
      <Table.Td>
        {removing ? (
          <Checkbox
            onChange={(event) => {
              event.currentTarget.checked
                ? setToRemoving([...toRemove, element.JobID])
                : setToRemoving(toRemove.filter((e) => e !== element.JobID));
            }}
          />
        ) : null}
      </Table.Td>
      <Table.Td>{element.JobID}</Table.Td>
      <Table.Td>{element.Date.split("T")[0]}</Table.Td>
      <Table.Td>{element.Title}</Table.Td>
      <Table.Td>{element.Company}</Table.Td>
      <Table.Td>
        {selectedRow == element.JobID && isEditing ? (
          <Input
            w={80}
            onChange={(e) => seteditStatus(e.target.value)}
            placeholder={element.Status}
          />
        ) : (
          element.Status
        )}
      </Table.Td>
      <Table.Td>
        {selectedRow == element.JobID && isEditing ? (
          <Flex gap={"xs"}>
            <Button onClick={() => updateApp(element.JobID)}>Confirm</Button>{" "}
            <Button onClick={() => setisEditing(false)}>Cancel</Button>
          </Flex>
        ) : (
          <Button onClick={() => startEdit(element.JobID, element.Status)}>
            Edit Status
          </Button>
        )}
      </Table.Td>
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
            <Text size="lg">{`Hello, ${user}!`}</Text>
          </Flex>
        </Grid.Col>

        <Grid.Col span={1}>
          <Flex
            gap="md"
            justify="flex-end"
            align="center"
            direction="row"
            wrap="nowrap"
            m={10}
          >
            {removing ? <Button onClick={removeApps}>Confirm</Button> : null}
            <Button onClick={startRmv}>
              {removing ? "Cancel" : "Remove Application"}
            </Button>
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
        m={20}
      >
        <Title order={2}>Jobs Tracker</Title>

        <Modal opened={opened} onClose={closeModal} title="Add Application">
          <TextInput
            label="Job ID"
            withAsterisk
            error={jID_err}
            onChange={(e) => setjobID(e.target.value)}
          />

          <DateInput
            withAsterisk
            error={date_err}
            onChange={setappDate}
            label="Date"
          />

          <TextInput
            label="Status"
            onChange={(e) => setappStatus(e.target.value)}
          />

          <Button mt={10} onClick={addApp}>
            Submit
          </Button>
        </Modal>

        <Table withTableBorder="true">
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th>Job ID</Table.Th>
              <Table.Th>Date Applied</Table.Th>
              <Table.Th>Job Title</Table.Th>
              <Table.Th>Company</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Flex>
    </div>
  );
}
