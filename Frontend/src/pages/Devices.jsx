import React, { useState } from "react";
import { Container, Button, Grid } from "@mui/material";
import BugReportDialog from "../components/BugReportDialog";
import Logs from "../components/Logs";
// Assuming Logs component is used for displaying logs and provides links to GitHub
// CodeViewer functionality might be handled through routing to a different path

function DeviceLog() {
  const [bugDialogOpen, setBugDialogOpen] = useState(false);

  const handleOpenBugDialog = () => {
    setBugDialogOpen(true);
  };

  const handleCloseBugDialog = () => {
    setBugDialogOpen(false);
  };

  return (
    <Container component="main" sx={{ mt: 10 }} maxWidth="lg">
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenBugDialog}
          >
            File Bug
          </Button>
        </Grid>
        <Grid item xs={12}>
          {/* Logs component to display device logs and links to code components */}
          <Logs />
        </Grid>
      </Grid>
      {/* BugReportDialog for capturing and submitting a bug report */}
      <BugReportDialog open={bugDialogOpen} onClose={handleCloseBugDialog} />
    </Container>
  );
}

export default DeviceLog;
