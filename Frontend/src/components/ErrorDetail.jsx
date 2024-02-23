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
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Error Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Message</Typography>
        <Typography gutterBottom>{errorLog.errorMessage}</Typography>
        <Typography variant="h6">Stack Trace</Typography>
        <Typography gutterBottom>{errorLog.stackTrace}</Typography>
        <Typography variant="h6">File</Typography>
        <Link
          href={errorLog.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {errorLog.fileName}:{errorLog.lineNumber}
        </Link>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDetail;
