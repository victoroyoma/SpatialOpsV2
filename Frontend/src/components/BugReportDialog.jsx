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
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setBugReport({ ...bugReport, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "https://spatial-ops-v2.vercel.app/api/bug-reports",
        bugReport
      );
      // Reset form after successful submission
      setBugReport({
        errorMessage: "",
        component: "",
        lineNumber: "",
        occurredAt: "",
      });
    } catch (error) {
      console.error("Failed to submit bug report:", error);
      setFeedback("Failed to submit bug report. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onClose={() => onClose(false)} fullWidth maxWidth="sm">
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
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        {feedback.message && (
          <Alert severity={feedback.type}>{feedback.message}</Alert>
        )}
        <Button
          onClick={() => onClose(false)}
          color="primary"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BugReportDialog;
