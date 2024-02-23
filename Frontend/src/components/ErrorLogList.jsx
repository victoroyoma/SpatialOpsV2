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
} from "@mui/material";

const ErrorLogList = () => {
  const [errorLogs, setErrorLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchErrorLogs = async () => {
      setLoading(true);
      try {
        const response = await fetch("/error/logs"); // Adjust the endpoint as needed
        const data = await response.json();
        setErrorLogs(data);
      } catch (error) {
        console.error("Failed to fetch error logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchErrorLogs();
  }, []);

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
              <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                {/* Link to detailed view or GitHub */}
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
  );
};

export default ErrorLogList;
