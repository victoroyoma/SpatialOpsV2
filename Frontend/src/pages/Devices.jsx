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
  Box,
  Modal,
  Typography,
} from "@mui/material";
import axios from "axios";
import BugReportDialog from "../components/BugReportDialog";
import Logs from "../components/Logs";
import CodeViewer from "../components/CodeViewer";

function DeviceLog() {
  const [bugDialogOpen, setBugDialogOpen] = useState(false);
  const [bugReports, setBugReports] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [error, setError] = useState("");

  const demoBugReports = [
    {
      id: 1,
      errorMessage: "405 Method not supported",
      component: "Device Log",
      lineNumber: 33,
      occurredAt: new Date(),
    },
    {
      id: 2,
      errorMessage: "404 Method not found",
      component: "Device Log",
      lineNumber: 20,
      occurredAt: new Date(),
    },
    {
      id: 3,
      errorMessage: "403 Access Denailed",
      component: "Messaging Error",
      lineNumber: 65,
      occurredAt: new Date(),
    },
  ];

  useEffect(() => {
    const fetchBugReports = async () => {
      try {
        const response = await axios.get(
          "https://spatial-ops-v2.vercel.app/api/reported-bugs"
        );
        setBugReports(response.data.data);
      } catch (error) {
        console.error("Failed to fetch bug reports:", error);
        setError("Failed to fetch bug reports. Please try again later.");
      }
    };

    fetchBugReports();
    setBugReports(demoBugReports);
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleOpenBugDialog = () => setBugDialogOpen(true);
  const handleCloseBugDialog = () => setBugDialogOpen(false);

  // Handler for selecting a log entry
  const handleSelectLog = (log) => {
    setSelectedLog(log);
  };

  // Modal style
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
    height: "80%",
    display: "block",
  };

  return (
    <Container component="main" sx={{ mt: 10 }} maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenBugDialog}
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
      <BugReportDialog open={bugDialogOpen} onClose={handleCloseBugDialog} />
      <Modal
        open={selectedLog !== null}
        onClose={() => setSelectedLog(null)}
        aria-labelledby="code-viewer-modal"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Code Viewer
          </Typography>
          {selectedLog && <CodeViewer filePath={selectedLog.filePath} />}
        </Box>
      </Modal>
    </Container>
  );
}

export default DeviceLog;
