import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddArtist = () => {
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [alertPopup, setAlertPopup] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name) {
      setError("Artist Name is Required");
      setAlertPopup(true);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/artist/add`,
        { name, profilePicture }
      );
      setResponseMessage("Artist added successfully.");
      setAlertPopup(true);
      setLoading(false);
      if (res.data && res.data?._id) {
        navigate(`/dashboard/edit-artist/${res.data._id}`);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong!");
      }
      setAlertPopup(true);
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <Box sx={{ pb: "50px" }}>
      {alertPopup && (
        <Alert
          sx={{ position: "fixed", top: "0", right: "0", zIndex: "20" }}
          severity={error ? "error" : "success"}
          onClose={() => setAlertPopup(false)}
        >
          {error ? error : responseMessage}
        </Alert>
      )}
      <Typography
        variant="h5"
        sx={{
          mb: "70px",
        }}
      >
        Add New Artist
      </Typography>
      <Box
        sx={{
          maxWidth: "600px",
        }}
      >
        <Box sx={{ mb: "30px" }}>
          <Typography sx={{ mb: "10px" }}>Enter Artist Name:</Typography>
          <TextField
            id="artist-name"
            label="Name"
            variant="outlined"
            sx={{ width: "100%" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: "30px" }}>
          <Typography sx={{ mb: "10px" }}>Profile Picture URL:</Typography>
          <TextField
            id="artist-dp"
            label="Profile Picture"
            variant="outlined"
            sx={{ width: "100%" }}
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
        </Box>
        <Box>
          <Button variant="contained" disabled={!name} onClick={handleSubmit}>
            {loading ? "Adding Artist..." : "Add Artist"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddArtist;
