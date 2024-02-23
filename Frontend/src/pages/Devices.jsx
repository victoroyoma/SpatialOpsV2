import React, { useState } from "react";
import ErrorLogList from "../components/ErrorLogList";
import ErrorDetail from "../components/ErrorDetail";
import { Container } from "@mui/material";

const App = () => {
  const [selectedErrorLog, setSelectedErrorLog] = useState(null);

  const handleLogClick = (log) => {
    setSelectedErrorLog(log);
  };

  const handleCloseDetail = () => {
    setSelectedErrorLog(null);
  };

  return (
    <Container component="main" sx={{ mt: 10 }}>
      <ErrorLogList onLogClick={handleLogClick} />
      {selectedErrorLog && (
        <ErrorDetail
          open={!!selectedErrorLog}
          onClose={handleCloseDetail}
          errorLog={selectedErrorLog}
        />
      )}
    </Container>
  );
};

export default App;
