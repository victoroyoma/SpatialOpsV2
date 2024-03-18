import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Link } from "@material-ui/core";

function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // TODO: Fetch logs from the backend and set them in state
    // Example:
    // setLogs(fetchedLogs);
  }, []);

  return (
    <List>
      {logs.map((log, index) => (
        <ListItem key={index}>
          <ListItemText primary={log.message} />
          <Link href={log.link} target="_blank" rel="noopener noreferrer">
            View Code
          </Link>
        </ListItem>
      ))}
      {/* TODO: Implement loading and error handling */}
    </List>
  );
}

export default Logs;
