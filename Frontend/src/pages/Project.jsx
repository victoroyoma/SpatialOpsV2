import React, { useState, useEffect } from "react";
// import TaskFilters from "../contexts/TaskFilters";
// import TaskSort from "../contexts/TaskSort";
// import { useNavigate } from "react-router-dom";
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
  CircularProgress,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Menu,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SortIcon from "@mui/icons-material/Sort";
import PersonIcon from "@mui/icons-material/Person";
import CircleIcon from "@mui/icons-material/Circle";
import SaveIcon from "@mui/icons-material/Save";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTheme, useMediaQuery } from "@mui/material";

const initialTaskData = {
  ticketID: "",
  title: "",
  status: "",
  component: "",
  assignee: "",
  milestone: "",
  priority: "",
  description: "",
  comments: "",
};
const statusOptions = ["In Progress", "Completed", "Not Started"];
const priorityOptions = [
  { value: "Pri0", label: "Pri0 - Right Now", color: "#ff1744" },
  { value: "Pri1", label: "Pri1 - Soon", color: "#ff9100" },
  { value: "Pri2", label: "Pri2 - Later", color: "#ffc400" },
  { value: "Pri3", label: "Pri3 - Eventually", color: "#00e676" },
];

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

const FilterPanel = ({ filters, onFilterChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  <Box
    sx={{
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      p: 2,
      gap: isMobile ? 1 : 2,
      alignItems: isMobile ? "stretch" : "center",
    }}
  >
    <Typography variant="h6" sx={{ width: isMobile ? "100%" : "auto" }}>
      Filters
    </Typography>
    <TextField
      label="Status"
      name="status"
      value={filters.status || ""}
      onChange={onFilterChange}
      select
      fullWidth={isMobile}
      margin="normal"
      size={isMobile ? "small" : "medium"}
    >
      {statusOptions.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
    <TextField
      label="Priority"
      name="priority"
      value={filters.priority || ""}
      onChange={onFilterChange}
      select
      fullWidth={isMobile}
      margin="normal"
      size={isMobile ? "small" : "medium"}
    >
      {priorityOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  </Box>;
};

const Project = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editable, setEditable] = useState(true);
  const [taskData, setTaskData] = useState(initialTaskData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [currentTaskUrl, setCurrentTaskUrl] = useState("");
  const [anchorElSort, setAnchorElSort] = useState(null);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const navigate = useNavigate();

  // Fetch tasks with filters and sorting
  useEffect(() => {
    setIsLoading(true);
    const query = new URLSearchParams({ ...filters, ...sort }).toString();
    fetch(`https://spatialops.onrender.com/tasks?${query}`)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setIsLoading(false);
      });
  }, [filters, sort]);

  //Handlers
  const handleOpen = () => {
    setEditable(true);
    setTaskData({
      ...initialTaskData,
      ticketID: `TID-${Math.random().toString(36).substr(2, 9)}`,
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
  };

  const handleInputChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));

    // Trigger sorting based on the selected filter
    if (name === "status") {
      // status
      const statusOrder = ["Completed", "In Progress", "Not Started"];
      setTasks((prevTasks) =>
        [...prevTasks].sort(
          (a, b) =>
            statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
        )
      );
    } else if (name === "priority") {
      // priority
      const priorityOrder = ["Pri0", "Pri1", "Pri2", "Pri3"];
      setTasks((prevTasks) =>
        [...prevTasks].sort(
          (a, b) =>
            priorityOrder.indexOf(a.priority) -
            priorityOrder.indexOf(b.priority)
        )
      );
    } else if (name === "assignee") {
      const assigneeCount = tasks.reduce((acc, task) => {
        acc[task.assignee] = (acc[task.assignee] || 0) + 1;
        return acc;
      }, {});
      // Sort tasks by the count of their assignees
      setTasks((prevTasks) =>
        [...prevTasks].sort(
          (a, b) => assigneeCount[b.assignee] - assigneeCount[a.assignee]
        )
      );
    }
  };

  const handleSortMenuClick = (event) => {
    setAnchorElSort(event.currentTarget);
  };

  const handleSortMenuClose = (sortOption) => {
    setSort({ ...sort, sortOption: sortOption });
    setAnchorElSort(null);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentTaskUrl).then(
      () => {
        alert("URL copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handleEditOpen = (task) => {
    fetch(`https://spatialops.onrender.com/tasks/${task.ticketID}`)
      .then((response) => response.json())
      .then((data) => {
        setTaskData(data);
        setOpen(true);
        setEditable(true);
      })
      .catch((error) => console.error("Error fetching task to Edit:", error));
  };

  const handleViewOpen = (task) => {
    fetch(`https://spatialops.onrender.com/tasks/${task.ticketID}`)
      .then((response) => response.json())
      .then((task) => {
        setTaskData(task);
        setOpen(true);
        setEditable(false);
        // navigate(`/tasks/${task.ticketID}`);

        const taskUrl = `${window.location.origin}/tasks/${task.ticketID}`;
        setCurrentTaskUrl(taskUrl);
        setViewDialogOpen(true);
      })
      .catch((error) => console.error("Error fetching task to View:", error));
  };

  const handleDelete = (ticketID) => {
    setIsDeleting(true);
    fetch(`https://spatialops.onrender.com/tasks/${ticketID}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.ticketID !== ticketID);
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error:", error));
    setIsDeleting(false);
  };

  const handleSubmit = () => {
    setIsSaving(true);
    if (editable) {
      const method = tasks.some((task) => task.ticketID === taskData.ticketID)
        ? "PUT"
        : "POST";
      const url =
        method === "PUT"
          ? `https://spatialops.onrender.com/tasks/${taskData.ticketID}`
          : "https://spatialops.onrender.com/tasks";

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
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        flexDirection="column"
      >
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: 20 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Container component="main" sx={{ mt: 10 }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
        <Tooltip title="Sort">
          <IconButton onClick={handleSortMenuClick}>
            <SortIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorElSort}
          open={Boolean(anchorElSort)}
          onClose={() => setAnchorElSort(null)}
        >
          {["Assingee", "Status", "Priority"].map((sortOption) => (
            <MenuItem
              key={sortOption}
              onClick={() => handleSortMenuClose(sortOption.toLowerCase())}
            >
              {sortOption}
            </MenuItem>
          ))}
        </Menu>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          disabled={isSaving || isDeleting}
        >
          Add Task
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ maxWidth: "100%", overflowX: "auto" }}
      >
        <Table size={isMobile ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              <TableCell>TicketID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Component</TableCell>
              <TableCell>Assignee</TableCell>
              <TableCell>Milestone</TableCell>
              <TableCell>Priority</TableCell>
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
                <TableCell
                  sx={{
                    color: priorityOptions.find(
                      (option) => option.value === task.priority
                    )?.color,
                  }}
                >
                  {
                    priorityOptions.find(
                      (option) => option.value === task.priority
                    )?.label
                  }
                </TableCell>
                <TableCell>{task.description}</TableCell>{" "}
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

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={isMobile ? "sm" : "md"}
      >
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
                <CircleIcon fontSize="small" style={{ marginRight: 8 }} />
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
                <PersonIcon fontSize="small" style={{ marginRight: 8 }} />
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
            select
            name="priority"
            label="Priority"
            fullWidth
            margin="dense"
            value={taskData.priority}
            onChange={handleInputChange}
            disabled={!editable}
            SelectProps={{
              renderValue: (selected) =>
                priorityOptions.find((option) => option.value === selected)
                  ?.label,
            }}
          >
            {priorityOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{ color: option.color }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>

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
          {editable && (
            <TextField
              name="comments"
              label="Comments"
              fullWidth
              margin="dense"
              value={taskData.comments}
              multiline
              rows={2}
              onChange={handleInputChange}
            />
          )}
        </DialogContent>
        <DialogActions>
          {editable ? (
            <Button
              onClick={handleSubmit}
              color="primary"
              startIcon={<SaveIcon />}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          ) : (
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseViewDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          <Typography variant="h6">{taskData.title}</Typography>
          <Typography variant="body1">Status: {taskData.status}</Typography>
          <Typography variant="body1">
            Component: {taskData.component}
          </Typography>
          <Typography variant="body1">Assignee: {taskData.assignee}</Typography>
          <Typography variant="body1">
            Milestone: {taskData.milestone}
          </Typography>
          <Typography variant="body1">Priority: {taskData.priority}</Typography>
          <Typography variant="body1">
            Description: {taskData.description}
          </Typography>
          <Typography variant="body1">Comments: {taskData.comments}</Typography>
          <Box display="flex" alignItems="center" gap={2} mt={2}>
            <TextField
              fullWidth
              value={currentTaskUrl}
              variant="outlined"
              InputProps={{ readOnly: true }}
            />
            <Tooltip title="Copy URL">
              <IconButton onClick={copyToClipboard}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Project;
