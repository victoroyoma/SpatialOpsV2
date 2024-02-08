import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message before attempting login

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        loginDetails
      );

      // Store the authentication token
      localStorage.setItem("token", response.data.token);

      // Store essential user details (excluding sensitive information)
      const { id, email, firstName, lastName } = response.data.user;
      const userData = JSON.stringify({ id, email, firstName, lastName });
      localStorage.setItem("user", userData);

      // Navigate to the home page or dashboard after successful login
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage); // Update error state to display the error message
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        style={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {error && (
          <Typography color="error" style={{ marginTop: 10 }}>
            {error}
          </Typography>
        )}
        <form style={{ width: "100%", marginTop: 1 }} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={loginDetails.email}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginDetails.password}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: "24px 0px 16px" }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
