import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

const TaskDetails = () => {
  const { ticketID } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetch(`https://spatialops.onrender.com/tasks/${ticketID}`)
      .then((response) => response.json())
      .then((data) => setTask(data))
      .catch((error) => console.error("Error fetching task:", error));
  }, [ticketID]);

  return (
    <Dialog open={true} onClose={() => window.history.back()}>
      <DialogTitle>Task Details</DialogTitle>
      <DialogContent>
        {task ? (
          <>
            <Typography variant="h6">
              {" "}
              <strong>Title</strong>
              {task.title}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {task.status}
            </Typography>
            <Typography variant="body1">
              <strong>Component:</strong> {task.component}
            </Typography>
            <Typography variant="body1">
              <strong>Assignee:</strong> {task.assignee}
            </Typography>
            <Typography variant="body1">
              <strong>Milestone:</strong> {task.milestone}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong> {task.description}
            </Typography>
            {Array.isArray(task.comments) ? (
              <div>
                <Typography variant="body1">
                  <strong>Comments:</strong>
                </Typography>
                {task.comments.map((comment, index) => (
                  <Typography key={index} variant="body2">
                    - {comment}
                  </Typography>
                ))}
              </div>
            ) : (
              <Typography variant="body1">
                <strong>Comment:</strong> {task.comments}
              </Typography>
            )}
          </>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetails;
