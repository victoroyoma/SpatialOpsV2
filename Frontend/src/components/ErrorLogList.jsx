import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Visibility as VisibilityIcon } from "@mui/icons-material";
import axios from "axios";
import { format } from "date-fns";
import ErrorDetail from "./ErrorDetail"; // Adjust the import path as needed

const ErrorLogList = () => {
  const [errorLogs, setErrorLogs] = useState([
    // Manually added demo error log
    {
      id: "demo-1",
      errorMessage:
        "TypeError: Cannot read properties of undefined (reading 'length')",
      fileName: "DemoComponent.js",
      lineNumber: 42,
      createdAt: new Date().toISOString(),
      githubUrl: "https://github.com/your-repo/path/to/DemoComponent.js#L42",
    },
  ]);
  // const [errorLogs, setErrorLogs] = useState([]);
  const [totalLogs, setTotalLogs] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedErrorLog, setSelectedErrorLog] = useState(null);
  const [newErrorLog, setNewErrorLog] = useState({
    errorMessage: "",
    fileName: "",
    lineNumber: "",
    createdAt: new Date(),
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/logs?page=${page}&limit=${rowsPerPage}`)
      .then((response) => {
        setErrorLogs(response.data.logs); // Adjust according to your API response structure
        setTotalLogs(response.data.total);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch error logs:", error);
        setLoading(false);
      });
  }, [page, rowsPerPage]);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewErrorLog({ ...newErrorLog, [name]: value });
  };

  const handleDateChange = (date) =>
    setNewErrorLog({ ...newErrorLog, createdAt: date });

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDetail = (log) => {
    setSelectedErrorLog(log);
    setDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
  };

  const handleSubmitErrorLog = () => {
    axios
      .post("/api/logs", { ...newErrorLog })
      .then(() => {
        handleCloseDialog();
        // Optionally refresh the logs list
      })
      .catch((error) => console.error("Failed to submit error log:", error));
  };

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        Fetching logs
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
          <TextField
            margin="dense"
            name="fileName"
            label="File Name"
            type="text"
            fullWidth
            variant="standard"
            value={newErrorLog.fileName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="lineNumber"
            label="Line Number"
            type="number"
            fullWidth
            variant="standard"
            value={newErrorLog.lineNumber}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Error Occurrence Date & Time"
              value={newErrorLog.createdAt}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
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
              <TableCell>GitHub URL</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {errorLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.errorMessage}</TableCell>
                <TableCell>{log.fileName}</TableCell>
                <TableCell>{log.lineNumber}</TableCell>
                <TableCell>
                  {format(new Date(log.createdAt), "PPPpp")}
                </TableCell>
                <TableCell>
                  <Link
                    href={log.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </Link>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDetail(log)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={errorLogs.length} // For demo purposes, using the length of the errorLogs array
        // count={totalLogs}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {selectedErrorLog && (
        <ErrorDetail
          open={detailOpen}
          onClose={handleCloseDetail}
          errorLog={selectedErrorLog}
        />
      )}
    </>
  );
};

export default ErrorLogList;
