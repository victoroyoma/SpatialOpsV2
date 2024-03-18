import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

function BugReportDialog({ open, onClose }) {
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    // TODO: Integrate HTML scene capture functionality here

    // TODO: Submit the bug report along with the scene capture to the backend
    console.log("Bug Description:", description);
    // Close dialog after submitting
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>File a Bug</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Bug Description"
          type="text"
          fullWidth
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Additional fields as needed */}
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
