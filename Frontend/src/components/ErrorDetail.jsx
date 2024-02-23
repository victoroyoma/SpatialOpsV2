import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Link,
  DialogActions,
  Button,
} from "@mui/material";

const ErrorDetail = ({ open, onClose, errorLog }) => {
  // Fallback for when errorLog is not provided
  const log = errorLog || {
    errorMessage: "No error message available",
    stackTrace: "No stack trace available",
    fileName: "No file specified",
    lineNumber: "N/A",
    githubUrl: "#",
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Error Details</DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6" gutterBottom>
          Message
        </Typography>
        <Typography paragraph>{log.errorMessage}</Typography>

        <Typography variant="h6" gutterBottom>
          Stack Trace
        </Typography>
        <Typography paragraph>{log.stackTrace}</Typography>

        <Typography variant="h6" gutterBottom>
          File
        </Typography>
        <Link href={log.githubUrl} target="_blank" rel="noopener noreferrer">
          {log.fileName}:{log.lineNumber}
        </Link>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDetail;
