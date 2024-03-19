import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";

function CodeViewer({ filePath }) {
  const [codeContent, setCodeContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCodeContent = async () => {
      try {
        const response = await axios.get(
          `/api/code-content?filePath=${encodeURIComponent(filePath)}`
        );
        setCodeContent(response.data);
      } catch (error) {
        console.error("Failed to fetch code content:", error);
      } finally {
        setLoading(false);
      }
    };

    if (filePath) {
      fetchCodeContent();
    }
  }, [filePath]);

  if (loading) {
    return <Typography>Loading code content...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h5">Code Viewer</Typography>
      <pre>{codeContent}</pre>
    </Container>
  );
}

export default CodeViewer;
