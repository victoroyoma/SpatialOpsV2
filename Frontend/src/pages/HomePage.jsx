import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  ListItemText,
  Box,
} from "@mui/material";
import facebookStyle from "../utils/facebookStyle";

const initialProfileData = { id: null, name: "", role: "", department: "" };
const initialLoginData = { email: "", password: "" };

const HomePage = () => {
  const [profiles, setProfiles] = useState([
    { id: 1, name: "Suzanne", role: "Developer", department: "Engineering" },
    { id: 2, name: "Victor", role: "Designer", department: "Design" },
    // ... other initial profiles
  ]);
  const [activeProfile, setActiveProfile] = useState(profiles[0]);
  const [openProfileForm, setOpenProfileForm] = useState(false);
  const [profileData, setProfileData] = useState(initialProfileData);
  const [openLogin, setOpenLogin] = useState(false);
  const [loginData, setLoginData] = useState(initialLoginData);

  const handleProfileSelect = (profile) => {
    setOpenLogin(true);
    setActiveProfile(profile);
    // TODO: Fetch detailed profile data from backend
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = () => {
    // TODO: Submit login details to backend for verification
    console.log("Login for:", loginData);
    setOpenLogin(false);
  };

  const handleLoginClose = () => {
    setOpenLogin(false);
    setActiveProfile(profiles[0]); // Revert to default or previous profile on cancel
  };

  const handleProfileFormChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleProfileFormSubmit = () => {
    // TODO: Create new profile in backend
    const newProfile = { ...profileData, id: Date.now() }; // Mock ID generation
    setProfiles([...profiles, newProfile]);
    setOpenProfileForm(false);
  };

  const handleProfileFormClose = () => {
    setOpenProfileForm(false);
  };

  return (
    <Container component="main">
      <Paper style={facebookStyle.paper}>
        <Typography variant="h5" style={facebookStyle.header}>
          Welcome to the Homepage
        </Typography>
        <Typography variant="h6" style={facebookStyle.header}>
          Active Profile: {activeProfile.name}
        </Typography>
        <Button
          style={facebookStyle.button}
          variant="contained"
          onClick={() => setOpenProfileForm(true)}
        >
          Create New Profile
        </Button>
        <Box style={facebookStyle.profileList}>
          <List>
            {profiles.map((profile) => (
              <ListItem
                style={facebookStyle.listItem}
                key={profile.id}
                onClick={() => handleProfileSelect(profile)}
              >
                <ListItemText primary={profile.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>

      <Dialog open={openProfileForm} onClose={handleProfileFormClose}>
        <DialogTitle>Create Profile</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            fullWidth
            margin="dense"
            value={profileData.name}
            onChange={handleProfileFormChange}
          />
          <TextField
            name="role"
            label="Role"
            fullWidth
            margin="dense"
            value={profileData.role}
            onChange={handleProfileFormChange}
          />
          <TextField
            name="department"
            label="Department"
            fullWidth
            margin="dense"
            value={profileData.department}
            onChange={handleProfileFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProfileFormClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleProfileFormSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openLogin} onClose={handleLoginClose}>
        <DialogTitle>Login to Switch Profile</DialogTitle>
        <DialogContent>
          <TextField
            name="email"
            label="email"
            fullWidth
            margin="dense"
            onChange={handleLoginChange}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            margin="dense"
            onChange={handleLoginChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLoginSubmit} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HomePage;
