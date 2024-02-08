import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Messaging = () => {
  const [currentThread, setCurrentThread] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [openThreadDialog, setOpenThreadDialog] = useState(false);
  const [newThreadName, setNewThreadName] = useState("");
  const [threads, setThreads] = useState([]);
  const [users, setUsers] = useState([]);

  const loggedInUser = { id: "currentUserId" };

  useEffect(() => {
    fetchThreads();
    fetchUsers();
  }, []);

  const fetchThreads = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/threads");
      const data = await response.json();
      if (Array.isArray(data)) {
        // Ensure data is an array
        setThreads(data);
      } else {
        console.warn("Threads data is not an array", data);
        setThreads([]); // Default to empty array in case of unexpected data structure
      }
    } catch (error) {
      console.error("Failed to fetch threads:", error);
      setThreads([]); // Default to empty array in case of error
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleThreadClick = async (thread) => {
    setCurrentThread(thread);
    setCurrentUser(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/threads/${thread.id}/messages`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        console.warn("Thread messages data is not an array", data);
        setMessages([]);
      }
    } catch (error) {
      console.error("Failed to fetch thread messages:", error);
      setMessages([]);
    }
  };

  const handleUserClick = async (user) => {
    setCurrentUser(user);
    setCurrentThread(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/direct-messages/${loggedInUser.id}/${user.id}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        console.warn("Direct messages data is not an array", data);
        setMessages([]);
      }
    } catch (error) {
      console.error("Failed to fetch direct messages:", error);
      setMessages([]);
    }
  };

  const handleMessageChange = (e) => {
    setMessageText(e.target.value);
  };

  const handleSendMessage = async () => {
    const messageData = currentThread
      ? {
          text: messageText,
          userId: loggedInUser.id, // Assume loggedInUser.id is correctly determined
          threadId: currentThread.id,
          isDirect: false,
        }
      : {
          text: messageText,
          userId: loggedInUser.id,
          recipientId: currentUser.id,
          isDirect: true,
        };

    try {
      await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(messageData),
      });
      setMessageText("");
      if (currentThread) {
        handleThreadClick(currentThread);
      } else if (currentUser) {
        handleUserClick(currentUser);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleCreateThread = async () => {
    const threadData = { name: newThreadName };
    const response = await fetch("http://localhost:5000/api/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(threadData),
    });
    const newThread = await response.json();
    setThreads([...threads, newThread]);
    setNewThreadName("");
    setOpenThreadDialog(false);
  };

  const handleEditMessage = async (messageId, newText) => {
    try {
      await fetch(`http://localhost:5000/api/messages/${messageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newText }),
      });
      // Refresh the message list to show the edited message
      if (currentThread) {
        handleThreadClick(currentThread);
      } else if (currentUser) {
        handleUserClick(currentUser);
      }
    } catch (error) {
      console.error("Failed to edit message:", error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await fetch(`http://localhost:5000/api/messages/${messageId}`, {
        method: "DELETE",
      });
      // Refresh the message list to remove the deleted message
      if (currentThread) {
        handleThreadClick(currentThread);
      } else if (currentUser) {
        handleUserClick(currentUser);
      }
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  const chatBubbleStyle = {
    background: "#e0e0e0",
    borderRadius: "15px",
    padding: "10px 20px",
    margin: "10px 0",
    display: "inline-block",
    maxWidth: "80%",
  };

  return (
    <Container component="main">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper elevation={3} style={{ padding: "10px" }}>
            <Typography variant="h6">Threads</Typography>
            <List component="nav">
              {threads.map((thread) => (
                <ListItem
                  button
                  key={thread.id}
                  onClick={() => handleThreadClick(thread)}
                >
                  <ListItemText primary={thread.name} />
                </ListItem>
              ))}
              <ListItem button onClick={() => setOpenThreadDialog(true)}>
                <ListItemText primary="Create New Thread" />
              </ListItem>
            </List>
            <Divider />
            <Typography variant="h6">Direct Messages</Typography>
            <List component="nav">
              {users.map((user) => (
                <ListItem
                  button
                  key={user.id}
                  onClick={() => handleUserClick(user)}
                >
                  <ListItemText
                    primary={`${user.firstName} ${user.lastName}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper
            elevation={3}
            style={{ height: "500px", overflow: "auto", padding: "10px" }}
          >
            <Typography variant="h6">
              {currentThread
                ? `Thread: ${currentThread.name}`
                : currentUser
                ? `DM with ${currentUser.name}`
                : "Select a Thread or User"}
            </Typography>
            <Divider />
            {messages.map((message) => (
              <Box key={message.id} sx={chatBubbleStyle}>
                <Typography variant="body1">
                  {message.User.firstName} {message.User.lastName}:{" "}
                  {message.text}
                </Typography>
                <IconButton
                  onClick={() =>
                    handleEditMessage(message.id, "New Message Text")
                  }
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteMessage(message.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Paper>
          <Paper style={{ padding: "10px", marginTop: "10px" }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={messageText}
              onChange={handleMessageChange}
              placeholder="Type a message..."
            />
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Dialog
        open={openThreadDialog}
        onClose={() => setOpenThreadDialog(false)}
      >
        <DialogTitle>Create New Thread</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Thread Name"
            fullWidth
            value={newThreadName}
            onChange={(e) => setNewThreadName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenThreadDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateThread} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Messaging;
