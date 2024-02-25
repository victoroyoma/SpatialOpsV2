import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Link,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const ErrorDetail = ({ open, onClose, errorLogId }) => {
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && errorLogId) {
      setLoading(true);
      axios
        .get(`/api/logs/${errorLogId}`)
        .then((response) => {
          setLog(response.data);
          setError("");
        })
        .catch((err) => {
          console.error("Failed to fetch error log details:", err);
          setError("Failed to fetch error log details");
          setLog(null);
        })
        .finally(() => setLoading(false));
    }
  }, [open, errorLogId]);

  if (loading) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent dividers>
          <CircularProgress />
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent dividers>
          <Typography color="error">{error}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  if (!log) {
    return null;
  }

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
