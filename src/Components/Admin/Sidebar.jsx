import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SpatialAudioOffIcon from "@mui/icons-material/SpatialAudioOff";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import EventIcon from "@mui/icons-material/Event";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Sidebar = () => {
  const [openArtistLink, setOpenArtistLink] = React.useState(false);
  const [openEventLink, setOpenEventLink] = React.useState(false);

  const handleOpenArtistLink = () => {
    setOpenArtistLink(!openArtistLink);
    setOpenEventLink(false);
  };
  const handleOpenEventLink = () => {
    setOpenEventLink(!openEventLink);
    setOpenArtistLink(false);
  };
  const { handleLogout } = React.useContext(AuthContext);
  return (
    <Box
      className="admin-sidebar"
      sx={{
        position: "fixed",
        left: "0",
        top: "0",
        backgroundColor: "#fff",
        paddingY: "50px",
        width: "300px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        minHeight: "100vh",
      }}
    >
      <Box>
        <nav className="admin-sidebar-menu">
          <List>
            <ListItem disablePadding>
              <Link to="/dashboard">
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </Link>
            </ListItem>
            {/* Artist */}
            <ListItem disablePadding onClick={handleOpenArtistLink}>
              <ListItemButton>
                <ListItemIcon>
                  <SpatialAudioOffIcon />
                </ListItemIcon>
                <ListItemText primary="Artist" />
                {openArtistLink ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openArtistLink} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/dashboard/artist">
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PeopleAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="All Artist" />
                  </ListItemButton>
                </Link>
                <Link to="/dashboard/add-artist">
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <GroupAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Artist" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>

            {/* Events */}
            <ListItem disablePadding onClick={handleOpenEventLink}>
              <ListItemButton>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText primary="Events" />
                {openEventLink ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openEventLink} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/dashboard/events">
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <CalendarMonthIcon />
                    </ListItemIcon>
                    <ListItemText primary="All Events" />
                  </ListItemButton>
                </Link>
                <Link to="/dashboard/add-event">
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <EditCalendarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Event" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>

            {/* Other Links */}

            <ListItem disablePadding>
              <Link to="/">
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Go To Homepage" />
                </ListItemButton>
              </Link>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    </Box>
  );
};

export default Sidebar;
