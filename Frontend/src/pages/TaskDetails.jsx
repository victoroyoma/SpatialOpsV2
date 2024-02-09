import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Paper, Typography } from "@mui/material";

const TaskDetails = () => {
  const { ticketID } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetch(`https://spatialops.onrender.com/tasks/${ticketID}`)
      .then((response) => response.json())
      .then((data) => setTask(data))
      .catch((error) => console.error("Error fetching task:", error));
  }, [ticketID]);

  if (!task) {
    return <div>Loading task details...</div>;
  }

  return (
    <Container component="main">
      <Paper style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4">{task.title}</Typography>
      </Paper>
    </Container>
  );
};

export default TaskDetails;
