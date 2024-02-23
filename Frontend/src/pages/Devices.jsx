import React, { useState } from "react";
import ErrorLogList from "../components/ErrorLogList";
import ErrorDetail from "../components/ErrorDetail";

const App = () => {
  const [selectedErrorLog, setSelectedErrorLog] = useState(null);

  const handleLogClick = (log) => {
    setSelectedErrorLog(log);
  };

  const handleCloseDetail = () => {
    setSelectedErrorLog(null);
  };

  return (
    <div>
      <ErrorLogList onLogClick={handleLogClick} />
      {selectedErrorLog && (
        <ErrorDetail
          open={!!selectedErrorLog}
          onClose={handleCloseDetail}
          errorLog={selectedErrorLog}
        />
      )}
    </div>
  );
};

export default App;
