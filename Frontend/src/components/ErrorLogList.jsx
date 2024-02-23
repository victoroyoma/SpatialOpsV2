import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Grid,
  useMediaQuery,
  useTheme,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const ErrorLogList = () => {
  const [errorLogs, setErrorLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newErrorLog, setNewErrorLog] = useState({
    errorMessage: "",
    fileName: "",
    lineNumber: "",
    createdAt: "",
    githubUrl: "",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setLoading(true);
    // Simulate fetching error logs
    setTimeout(() => {
      setErrorLogs([
        {
          id: 1,
          errorMessage: "TypeError: Cannot read properties of undefined",
          fileName: "ComponentA.js",
          lineNumber: 42,
          createdAt: new Date().toISOString(),
          githubUrl: "https://github.com/path/to/file",
        },
        // Add more demo logs as needed
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewErrorLog({ ...newErrorLog, [name]: value });
  };

  const handleSubmitErrorLog = () => {
    console.log("Submitting new error log:", newErrorLog);
    // Here you would typically send the new error log to your backend
    setOpenDialog(false);
  };

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <Button variant="outlined" onClick={handleOpenDialog}>
        File Bug Report
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>File a New Bug Report</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="errorMessage"
            label="Error Message"
            type="text"
            fullWidth
            variant="standard"
            value={newErrorLog.errorMessage}
            onChange={handleChange}
          />
          {/* Include other fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitErrorLog}>Submit</Button>
        </DialogActions>
      </Dialog>
      <TableContainer
        component={Paper}
        style={{ maxWidth: "100%", overflowX: "auto" }}
      >
        <Table size={isMobile ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              <TableCell>Error Message</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Line</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {errorLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.errorMessage}</TableCell>
                <TableCell>{log.fileName}</TableCell>
                <TableCell>{log.lineNumber}</TableCell>
                <TableCell>
                  {new Date(log.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <a
                    href={log.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ErrorLogList;
