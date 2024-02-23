import React, { useState, useEffect } from "react";
import ErrorLogList from "../components/ErrorLogList";
import ErrorDetail from "../components/ErrorDetail";
import { Container, CircularProgress, Typography, Box } from "@mui/material";

const App = () => {
  const [selectedErrorLog, setSelectedErrorLog] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogClick = (log) => {
    setSelectedErrorLog(log);
  };

  const handleCloseDetail = () => {
    setSelectedErrorLog(null);
  };

  useEffect(() => {
    setLoading(true);
    // Simulate fetching error logs
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <Container component="main" sx={{ mt: 10 }}>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          minHeight="100vh"
        >
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Fetching Error Logs
          </Typography>
        </Box>
      ) : (
        <>
          <ErrorLogList onLogClick={handleLogClick} />
          {selectedErrorLog && (
            <ErrorDetail
              open={!!selectedErrorLog}
              onClose={handleCloseDetail}
              errorLog={selectedErrorLog}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default App;
