import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  ButtonBase,
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
import IconButton from "@mui/material/IconButton";
import { getLoggedInUser } from "../utils/userUtils"; // Adjust the import path as needed

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const loggedInUser = getLoggedInUser();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
      <ListItem>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
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
          <ButtonBase
            onClick={logout}
            sx={{ width: "100%", justifyContent: "flex-start" }}
          >
            <ListItem>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </ButtonBase>
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
    <Box sx={{ display: "flex" }}>
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
            <Box sx={{ display: "flex" }}>
              {/* Non-mobile nav items */}
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

              {loggedInUser ? (
                <ButtonBase
                  onClick={logout}
                  sx={{ color: "inherit", marginLeft: 2 }}
                >
                  <ExitToAppIcon />
                  <Typography sx={{ marginLeft: 1 }}>Logout</Typography>
                </ButtonBase>
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
    </Box>
  );
};

export default NavBar;
