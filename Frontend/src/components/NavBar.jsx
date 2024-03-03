import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ButtonBase,
  useTheme,
  useMediaQuery,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  CircularProgress,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import WorkIcon from "@mui/icons-material/Work";
import DevicesIcon from "@mui/icons-material/Devices";
import CollectionsIcon from "@mui/icons-material/Collections";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BugReportIcon from "@mui/icons-material/BugReport";
import html2canvas from "html2canvas";
import { getLoggedInUser } from "../utils/userUtils";

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bugDialogOpen, setBugDialogOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const loggedInUser = getLoggedInUser();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleFileBugClick = () => {
    html2canvas(document.body).then((canvas) => {
      console.log(canvas);
      setBugDialogOpen(true);
    });
  };

  const handleBugReportSubmit = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      console.log("Bug reported:", bugDescription);
      setBugDialogOpen(false);
      setBugDescription("");
    }, 2000);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const NavItem = ({ icon, text, to }) => (
    <ButtonBase
      component={Link}
      to={to}
      sx={{ width: "100%", justifyContent: "flex-start" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", padding: "8px 16px" }}>
        {icon}
        <Typography sx={{ marginLeft: "10px" }}>{text}</Typography>
      </Box>
    </ButtonBase>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", width: 250 }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Spatial Ops
      </Typography>
      <List>
        <NavItem icon={<HomeIcon />} text="Home" to="/" />
        <NavItem icon={<MessageIcon />} text="Messaging" to="/messaging" />
        <NavItem icon={<WorkIcon />} text="Task Manager" to="/project" />
        <NavItem icon={<DevicesIcon />} text="Device Logs" to="/devices" />
        <NavItem
          icon={<CollectionsIcon />}
          text="Dev Gallery"
          to="/dev-gallery"
        />

        {loggedInUser ? (
          <Box sx={{ padding: "8px 16px" }}>
            <Typography color="inherit" sx={{ marginRight: 2 }}>
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
          <>
            <NavItem icon={<LoginIcon />} text="Login" to="/login" />
            <NavItem
              icon={<AppRegistrationIcon />}
              text="Register"
              to="/register"
            />
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar component="nav">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Spatial Ops
          </Typography>
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <NavItem icon={<HomeIcon />} text="Home" to="/" />
              <NavItem
                icon={<MessageIcon />}
                text="Messaging"
                to="/messaging"
              />
              <NavItem icon={<WorkIcon />} text="Task Manager" to="/project" />
              <NavItem
                icon={<DevicesIcon />}
                text="Device Logs"
                to="/devices"
              />
              <NavItem
                icon={<CollectionsIcon />}
                text="Dev Gallery"
                to="/dev-gallery"
              />
              {/* Authentication Section */}
              {loggedInUser ? (
                <Box
                  sx={{ display: "flex", alignItems: "center", marginLeft: 2 }}
                >
                  <Typography color="inherit" sx={{ marginRight: 2 }}>
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
                <Box sx={{ display: "flex" }}>
                  <NavItem icon={<LoginIcon />} text="Login" to="/login" />
                  <NavItem
                    icon={<AppRegistrationIcon />}
                    text="Register"
                    to="/register"
                  />
                </Box>
              )}
            </Box>
          )}

          <IconButton color="inherit" onClick={handleFileBugClick}>
            Bug <BugReportIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1 }}></Box>
      <Dialog open={bugDialogOpen} onClose={() => setBugDialogOpen(false)}>
        <DialogTitle>File a Bug</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="bugDescription"
            label="Bug Description"
            type="text"
            fullWidth
            variant="outlined"
            value={bugDescription}
            onChange={(e) => setBugDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBugDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleBugReportSubmit}
            color="primary"
            disabled={isUploading}
          >
            {isUploading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NavBar;
