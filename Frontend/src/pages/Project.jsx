import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  MenuItem,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import CircleIcon from "@mui/icons-material/Circle";

const initialTaskData = {
  ticketID: "",
  title: "",
  status: "",
  component: "",
  assignee: "",
  milestone: "",
  description: "",
  comments: "",
};
const statusOptions = ["In Progress", "Completed", "Not Started"];
const componentOptions = [
  "DevGallery",
  "Device Logs",
  "Messaging",
  "Task Management",
  "Login",
  "Registry",
  "HomePage",
  "Profile Selector",
];
const componentColors = {
  "Dev Gallery": "red",
  "Device Logs": "blue",
  Messaging: "green",
  "Task Management": "purple",
  Login: "yellow",
  Registry: "pink",
  HomePage: "grey",
};
const assigneeOptions = ["Victor", "Lewey", "Richard", "Suzane"];
const statusColors = {
  "Not Started": "red",
  "In Progress": "blue",
  Completed: "green",
};

const Project = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editable, setEditable] = useState(true);
  const [taskData, setTaskData] = useState(initialTaskData);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleOpen = () => {
    setEditable(true);
    setTaskData({
      ...initialTaskData,
      ticketID: `TID-${Math.random().toString(36).substr(2, 9)}`,
    });
    setOpen(true);
  };

  const handleEditOpen = (task) => {
    fetch(`http://localhost:5000/tasks/${task.ticketID}`)
      .then((response) => response.json())
      .then((data) => {
        setTaskData(data);
        setOpen(true);
        setEditable(true);
      })
      .catch((error) => console.error("Error fetching task to Edit:", error));
  };

  const handleViewOpen = (task) => {
    fetch(`http://localhost:5000/tasks/${task.ticketID}`)
      .then((response) => response.json())
      .then((data) => {
        setTaskData(data);
        setOpen(true);
        setEditable(false);
      })
      .catch((error) => console.error("Error fetching task to View:", error));
  };

  const handleDelete = (ticketID) => {
    fetch(`http://localhost:5000/tasks/${ticketID}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.ticketID !== ticketID);
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editable) {
      const method = tasks.some((task) => task.ticketID === taskData.ticketID)
        ? "PUT"
        : "POST";
      const url =
        method === "PUT"
          ? `http://localhost:5000/tasks/${taskData.ticketID}`
          : "http://localhost:5000/tasks";

      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedTasks =
            method === "POST"
              ? [...tasks, data]
              : tasks.map((task) =>
                  task.ticketID === taskData.ticketID ? data : task
                );

          setTasks(updatedTasks);
          handleClose();
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <Container component="main">
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Add Task
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>TicketID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Component</TableCell>
              <TableCell>Assignee</TableCell>
              <TableCell>Milestone</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.ticketID}>
                <TableCell>{task.ticketID}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell style={{ color: statusColors[task.status] }}>
                  {task.status}
                </TableCell>
                <TableCell style={{ color: componentColors[task.component] }}>
                  {task.component}
                </TableCell>
                <TableCell>{task.assignee}</TableCell>
                <TableCell>{task.milestone}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.comments}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditOpen(task)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(task.ticketID)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleViewOpen(task)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editable ? "Add Task" : "View Task"}</DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            label="Title"
            fullWidth
            margin="dense"
            value={taskData.title}
            onChange={handleInputChange}
            disabled={!editable}
          />
          <TextField
            name="ticketID"
            label="Ticket ID"
            fullWidth
            margin="dense"
            value={taskData.ticketID}
            disabled
          />
          <TextField
            select
            name="status"
            label="Status"
            fullWidth
            margin="dense"
            value={taskData.status}
            onChange={handleInputChange}
            disabled={!editable}
          >
            {statusOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            name="component"
            label="Component"
            fullWidth
            margin="dense"
            value={taskData.component}
            onChange={handleInputChange}
            disabled={!editable}
          >
            {componentOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                <CircleIcon fontSize="small" style={{ marginRight: 8 }} />{" "}
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            name="assignee"
            label="Assignee"
            fullWidth
            margin="dense"
            value={taskData.assignee}
            onChange={handleInputChange}
            disabled={!editable}
          >
            {assigneeOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                <PersonIcon fontSize="small" style={{ marginRight: 8 }} />{" "}
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name="milestone"
            label="Milestone"
            fullWidth
            margin="dense"
            value={taskData.milestone}
            onChange={handleInputChange}
            disabled={!editable}
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            margin="dense"
            value={taskData.description}
            multiline
            rows={4}
            onChange={handleInputChange}
            disabled={!editable}
          />
          <TextField
            name="comments"
            label="Comments"
            fullWidth
            margin="dense"
            value={taskData.comments}
            multiline
            rows={2}
            onChange={handleInputChange}
            disabled={!editable}
          />
        </DialogContent>
        <DialogActions>
          {editable ? (
            <Button onClick={handleSubmit} color="primary">
              Save Changes
            </Button>
          ) : (
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Project;
