import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Modal,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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

const getCurrentDateFormatted = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const EditEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [eventDate, setEventDate] = useState(dayjs(getCurrentDateFormatted()));
  const [artist, setArtist] = useState("");
  const [loading, setLoading] = useState(false);
  const [allArtist, setAllArtist] = useState([]);
  const [loadingAllArtist, setLoadingAllArtist] = useState(true);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [alertPopup, setAlertPopup] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");
  const [currentEvent, setCurrentEvent] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const params = useParams();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!params?.id) {
      setError("Sorry, event not found!");
      setAlertPopup(true);
      return;
    }
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
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_API_URL}/event/edit/${params.id}`,
        eventData
      );
      if (res.data?._id) {
        setResponseMessage("Event Update successfully.");
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

  useEffect(() => {
    const getEventDetailsFromDB = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/event/details/${params.id}`
        );
        if (res.data && res.data._id) {
          setCurrentEvent(res.data);
          setTitle(res.data.title);
          setDescription(res.data?.description || "");
          setEventDate(dayjs(res.data.eventDate));
          setThumbnail(res.data?.thumbnail || "");
        }
        setLoadingEvent(false);
      } catch (error) {
        console.log(error);
        setLoadingEvent(false);
        setError("Something went wrong!");
        setAlertPopup(true);
      }
    };
    if (params?.id) {
      getEventDetailsFromDB();
    }
  }, [params]);

  useEffect(() => {
    const getAllArtistFromDB = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/artist/all`
        );
        if (res.data && res.data?.length > 0) {
          setAllArtist(res.data);
          if (currentEvent && currentEvent?.artist) {
            const selectedArtist = res.data.find(
              (item) => item._id === currentEvent.artist._id
            );
            setArtist(selectedArtist);
          }
        }
        setLoadingAllArtist(false);
      } catch (error) {
        console.log(error);
        setLoadingAllArtist(false);
      }
    };
    getAllArtistFromDB();
  }, [currentEvent]);

  const handleDeleteEvent = async () => {
    if (!params?.id) {
      setOpen(false);
      setError("Sorry, event not found!");
      setAlertPopup(true);
      return;
    }
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_API_URL}/event/delete/${params.id}`
      );
      if (res.data && res.data?.success) {
        setOpen(false);
        setResponseMessage("Event deleted successfully.");
        setAlertPopup(true);
        navigate("/dashboard/events");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
      setAlertPopup(true);
    }
  };

  return (
    <>
      {loadingAllArtist || loadingEvent ? (
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
            Edit Event
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
              <Typography sx={{ mb: "10px" }}>Select Event Date:</Typography>
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
              <Typography sx={{ mb: "10px" }}>Select An Artist :</Typography>
              <TextField
                id="event-artist"
                select
                label="Select Artist"
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                disabled={!title || !artist || !eventDate}
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
                Delete Event
              </Button>
            </Box>
          </Box>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Delete This Event ({title})?
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: "30px" }}>
                <Button variant="contained" onClick={handleDeleteEvent}>
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
      )}
    </>
  );
};

export default EditEvent;
