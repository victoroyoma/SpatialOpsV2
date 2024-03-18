import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios"; // Assuming axios for HTTP requests
import BugReportDialog from "../components/BugReportDialog";
import Logs from "../components/Logs";

function DeviceLog() {
  const [bugDialogOpen, setBugDialogOpen] = useState(false);
  const [bugReports, setBugReports] = useState([]);

  useEffect(() => {
    // Fetch bug reports from your backend
    const fetchBugReports = async () => {
      try {
        const response = await axios.get("/api/bug-reports"); // Adjust API endpoint as necessary
        setBugReports(response.data); // Assume response.data contains the array of bug reports
      } catch (error) {
        console.error("Failed to fetch bug reports:", error);
        // Handle error appropriately
      }
    };

    fetchBugReports();
  }, []);

  return (
    <Container component="main" sx={{ mt: 10 }} maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setBugDialogOpen(true)}
          >
            File Bug
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          {/* Optional: Logs component to display device logs and links to code components */}
          <Logs />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <Table stickyHeader aria-label="bug reports table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Error Message</TableCell>
                  <TableCell>Component</TableCell>
                  <TableCell>Line Number</TableCell>
                  <TableCell>Occurred At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(bugReports) &&
                  bugReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.id}</TableCell>
                      <TableCell>{report.errorMessage}</TableCell>
                      <TableCell>{report.component}</TableCell>
                      <TableCell>{report.lineNumber}</TableCell>
                      <TableCell>
                        {new Date(report.occurredAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
      {/* BugReportDialog for capturing and submitting a bug report */}
      <BugReportDialog
        open={bugDialogOpen}
        onClose={() => setBugDialogOpen(false)}
      />
    </Container>
  );
}

export default DeviceLog;
