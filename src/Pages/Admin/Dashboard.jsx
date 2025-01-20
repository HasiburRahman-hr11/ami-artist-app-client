import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { ArtistWithEvents } from "../../Components/Admin/ArtistWithEvents";


const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h5" sx={{ textAlign: "center", mb: "50px" }}>
        Artists and their Events
      </Typography>
      <ArtistWithEvents />
    </Box>
  );
};

export default Dashboard;
