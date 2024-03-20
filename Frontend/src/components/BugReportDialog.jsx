import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

function BugReportDialog({ open, onClose }) {
  const [bugReport, setBugReport] = useState({
    errorMessage: "",
    component: "",
    lineNumber: "",
    occurredAt: "",
  });

  const handleChange = (e) => {
    setBugReport({ ...bugReport, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post(
      "https://spatial-ops-v2.vercel.app/api/bug-reports",
      bugReport
    );
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
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BugReportDialog;
