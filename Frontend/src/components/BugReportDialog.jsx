import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

function BugReportDialog({ open, onClose }) {
  const [bugReport, setBugReport] = useState({
    errorMessage: "",
    component: "",
    lineNumber: "",
    occurredAt: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setBugReport({ ...bugReport, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      await axios.post("/bug-reports", bugReport);
      onClose();
    } catch (error) {
      console.error("Failed to submit bug report:", error);
      setError("Failed to submit bug report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>File a Bug</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="errorMessage"
          label="Error Message"
          type="text"
          fullWidth
          variant="outlined"
          value={bugReport.errorMessage}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="component"
          label="Component"
          type="text"
          fullWidth
          variant="outlined"
          value={bugReport.component}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="lineNumber"
          label="Line Number"
          type="number"
          fullWidth
          variant="outlined"
          value={bugReport.lineNumber}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="occurredAt"
          label="Occurred At"
          type="datetime-local"
          fullWidth
          variant="outlined"
          value={bugReport.occurredAt}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        {error && <Alert severity="error">{error}</Alert>}{" "}
        <Button onClick={onClose} color="primary" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Submit"}{" "}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BugReportDialog;
