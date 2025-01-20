import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const getCurrentDateFormatted = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const AddEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [eventDate, setEventDate] = useState(dayjs(getCurrentDateFormatted()));
  const [artist, setArtist] = useState("");
  const [loading, setLoading] = useState(false);
  const [allArtist, setAllArtist] = useState([]);
  const [loadingAllArtist, setLoadingAllArtist] = useState(true);
  const [alertPopup, setAlertPopup] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getAllArtistFromDB = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/artist/all`
        );
        if (res.data && res.data?.length > 0) {
          setAllArtist(res.data);
          setArtist(res.data[0]);
        }
        setLoadingAllArtist(false);
      } catch (error) {
        console.log(error);
        setLoadingAllArtist(false);
      }
    };
    getAllArtistFromDB();
  }, []);

  const handleSubmit = async () => {
    if (!title) {
      setError("Event Title is Required");
      setAlertPopup(true);
      return;
    }
    if (!eventDate) {
      setError("Event Date is Required");
      setAlertPopup(true);
      return;
    }
    if (!artist) {
      setError("Please Select An Artist.");
      setAlertPopup(true);
      return;
    }
    setLoading(true);
    try {
      let eventData = {
        artist: artist._id,
        title,
        description,
        thumbnail,
      };
      if (eventDate) {
        const formattedDate = dayjs(eventDate).format("YYYY-MM-DD");
        eventData.eventDate = formattedDate;
      }
      console.log(eventData);
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/event/add`,
        eventData
      );
      if (res.data?._id) {
        setResponseMessage("Event added successfully.");
        setAlertPopup(true);
      }

      setLoading(false);
      if (res.data && res.data?._id) {
        navigate(`/dashboard/edit-event/${res.data._id}`);
      }
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
  return (
    <>
      {loadingAllArtist ? (
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
        <>
          {allArtist.length < 1 ? (
            <Box
              sx={{
                textAlign: "center",
                padding: "100px 0 50px 0",
              }}
            >
              <Typography
                component="p"
                sx={{
                  fontSize: "20px",
                  mb: "20px",
                }}
              >
                Artist is required to create an event. You have not added any
                Artist yet.
              </Typography>
              <Link to="/dashboard/add-artist">
                <Button variant="contained">Add An Artist Now</Button>
              </Link>
            </Box>
          ) : (
            <Box sx={{ pb:'50px'}}>
              {alertPopup && (
                <Alert
                  sx={{
                    position: "fixed",
                    top: "0",
                    right: "0",
                    zIndex: "20",
                  }}
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
                Add New Event
              </Typography>
              <Box
                sx={{
                  maxWidth: "600px",
                }}
              >
                <Box sx={{ mb: "30px" }}>
                  <Typography sx={{ mb: "10px" }}>
                    Enter Event Name/Title:
                  </Typography>
                  <TextField
                    id="event-title"
                    label="Title*"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Box>
                <Box sx={{ mb: "30px" }}>
                  <Typography sx={{ mb: "10px" }}>
                    Add a Description (optional):
                  </Typography>
                  <TextField
                    id="event-description"
                    label="Description"
                    variant="outlined"
                    multiline
                    sx={{ width: "100%" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Box>
                <Box sx={{ mb: "30px" }}>
                  <Typography sx={{ mb: "10px" }}>
                    Select Event Date:
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select Event Date *"
                      value={eventDate}
                      onChange={(newValue) => setEventDate(newValue)}
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </Box>
                <Box sx={{ mb: "30px" }}>
                  <Typography sx={{ mb: "10px" }}>Select An Artist:</Typography>
                  <TextField
                    id="event-artist"
                    select
                    label="Select Artist"
                    defaultValue="EUR"
                    sx={{ width: "100%" }}
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                  >
                    {allArtist.map((artist, index) => (
                      <MenuItem key={index} value={artist}>
                        {artist.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box sx={{ mb: "30px" }}>
                  <Typography sx={{ mb: "10px" }}>
                    Event Poster / Thumbnail URL:
                  </Typography>
                  <TextField
                    id="event-thumbnail"
                    label="Event Thumbnail"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                  />
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    disabled={!title || !eventDate || !artist}
                    onClick={handleSubmit}
                  >
                    {loading ? "Adding Event..." : "Add Event"}
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default AddEvent;
