import { Box, Button, TextField, Typography, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditArtist = () => {
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [alertPopup, setAlertPopup] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingArtistDetails, setLoadingArtistDetails] = useState(true);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name) {
      setError("Artist Name is Required");
      setAlertPopup(true);
      return;
    }
    if (!params?.id) {
      setError("Sorry, artist not found!");
      setAlertPopup(true);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_API_URL}/artist/edit/${params.id}`,
        { name, profilePicture }
      );
      if (res.data?._id) {
        setResponseMessage("Artist Updated successfully.");
        setAlertPopup(true);
      }
      setLoading(false);
    } catch (error) {
      if (error?.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong!");
      }
      setAlertPopup(true);
      console.log(error);
      setLoading(false);
    }
  };

  const handleDeleteArtist = async () => {
    if (!params?.id) {
      setOpen(false);
      setError("Sorry, artist not found!");
      setAlertPopup(true);
      return;
    }
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_API_URL}/artist/delete/${params.id}`
      );
      if (res.data && res.data?.success) {
        setOpen(false);
        setResponseMessage("Artist deleted successfully.");
        setAlertPopup(true);
        navigate("/dashboard/artist");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
      setAlertPopup(true);
    }
  };

  useEffect(() => {
    const getArtistDetailsFromDB = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/artist/details/${params.id}`
        );
        if (res.data && res.data._id) {
          setName(res.data.name);
          setProfilePicture(res.data.profilePicture);
        }
        setLoadingArtistDetails(false);
      } catch (error) {
        console.log(error);
        setLoadingArtistDetails(false);
        setError("Something went wrong!");
        setAlertPopup(true);
      }
    };
    if (params?.id) {
      getArtistDetailsFromDB();
    }
  }, [params]);

  return (
    <>
      {loadingArtistDetails ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "calc(100vh - 100px)",
          }}
        >
          <Typography variant="h6">loading....</Typography>
        </Box>
      ) : (
        <Box sx={{ pb:'50px'}}>
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
            Edit Artist
          </Typography>
          <Box
            sx={{
              maxWidth: "600px",
            }}
          >
            <Box sx={{ mb: "30px" }}>
              <Typography sx={{ mb: "10px" }}>Artist Name:</Typography>
              <TextField
                id="artist-name"
                label="Name*"
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                disabled={!name}
                onClick={handleSubmit}
              >
                {loading ? "Updating..." : "Update"}
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ ml: "20px" }}
                onClick={handleOpen}
              >
                Delete Artist
              </Button>
            </Box>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Delete This Artist ({name})?
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: "30px" }}>
                  <Button variant="contained" onClick={handleDeleteArtist}>
                    Confirm
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ ml: "20px" }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Modal>
          </Box>
        </Box>
      )}
    </>
  );
};

export default EditArtist;
