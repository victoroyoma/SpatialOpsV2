import React, { useState, useRef } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
  Box,
} from "@mui/material";

const DevGallery = () => {
  const [fileData, setFileData] = useState({ description: "" });
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef();

  const resetForm = () => {
    setFileData({ description: "" });
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", fileData.description);

    try {
      await axios.post(
        "http://localhost:5000/api/dev-gallery/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("File uploaded successfully!");
      // handleRetrieveImages();
      resetForm();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  const handleRetrieveImages = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/dev-gallery/images"
      );
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <Typography variant="h5" gutterBottom>
          Dev Gallery
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Select File
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={fileData.description}
                onChange={(e) => setFileData({ description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Upload
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleRetrieveImages}
              >
                Retrieve Images
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Display Gallery</Typography>
          <Grid container spacing={2}>
            {images.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper elevation={2} sx={{ p: 1 }}>
                  <img
                    src={image.imageUrl}
                    alt={image.description}
                    style={{ width: "100%", borderRadius: "4px" }}
                  />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {image.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default DevGallery;
