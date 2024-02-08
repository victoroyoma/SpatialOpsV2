import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import WorkIcon from "@mui/icons-material/Work";
import DevicesIcon from "@mui/icons-material/Devices";
import CollectionsIcon from "@mui/icons-material/Collections";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Icon for the logout button
import { getLoggedInUser } from "../utils/userUtils"; // Ensure the path is correct based on your project structure

const NavBar = () => {
  const loggedInUser = getLoggedInUser(); // Retrieve logged-in user data from localStorage
  const navigate = useNavigate();

  const logout = () => {
    // Clear user data and authentication token from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Navigate to the login page after successful logout
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: "space-between", gap: "2px" }}>
        <Typography variant="h4">Spatial Ops</Typography>
        {/* Navigation Section */}
        <Box>
          <IconButton color="inherit" component={Link} to="/" aria-label="home">
            <HomeIcon />
            <Typography variant="h6">Home</Typography>
          </IconButton>
          <IconButton
            color="inherit"
            component={Link}
            to="/messaging"
            aria-label="messaging"
          >
            <MessageIcon />
            <Typography variant="h6">Messaging</Typography>
          </IconButton>
          <IconButton
            color="inherit"
            component={Link}
            to="/project"
            aria-label="project"
          >
            <WorkIcon />
            <Typography variant="h6">Task Manager</Typography>
          </IconButton>
          <IconButton
            color="inherit"
            component={Link}
            to="/devices"
            aria-label="devices"
          >
            <DevicesIcon />
            <Typography variant="h6">Device Logs</Typography>
          </IconButton>
          <IconButton
            color="inherit"
            component={Link}
            to="/dev-gallery"
            aria-label="dev-gallery"
          >
            <CollectionsIcon />
            <Typography variant="h6">Dev Gallery</Typography>
          </IconButton>
        </Box>

        {/* Authentication Section */}
        {loggedInUser ? (
          <Box>
            <Typography color="inherit" style={{ marginRight: 16 }}>
              Welcome, {loggedInUser.firstName || loggedInUser.email}
            </Typography>
            <Button
              color="inherit"
              onClick={logout}
              startIcon={<ExitToAppIcon />}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              startIcon={<LoginIcon />}
            >
              Login
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/register"
              startIcon={<AppRegistrationIcon />}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
