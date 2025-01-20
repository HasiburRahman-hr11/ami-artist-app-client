import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import { Link } from "react-router-dom";

const Events = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loadingAllEvents, setLoadingAllEvents] = useState(true);

  useEffect(() => {
    const getAllEventsFromDB = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/event/all`
        );
        if (res.data && res.data?.length > 0) {
          console.log("All Events --", res.data);
          setAllEvents(res.data);
        }
        setLoadingAllEvents(false);
      } catch (error) {
        console.log(error);
        setLoadingAllEvents(false);
      }
    };
    getAllEventsFromDB();
  }, []);

  return (
    <>
      {loadingAllEvents ? (
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
        <Box sx={{ pb: "50px" }}>
          <Typography
            variant="h5"
            sx={{
              mb: "70px",
            }}
          >
            Showing All Events
          </Typography>

          {allEvents.length > 0 ? (
            <Grid container spacing={4}>
              {allEvents.map((event, index) => (
                <Grid size={4} key={index}>
                  <Link
                    to={`/dashboard/edit-event/${event._id}`}
                    style={{ display: "block", width: "100%" }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#fff",
                        padding: "25px",
                        borderRadius: "8px",
                        marginBottom: "20px",
                        boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
                      }}
                    >
                      <Box
                        sx={{
                          marginBottom: "20px",
                          position: "relative",
                        }}
                      >
                        <Box
                          component="img"
                          src={
                            event?.thumbnail
                              ? event.thumbnail
                              : "https://cdn.pixabay.com/photo/2016/08/20/05/51/avatar-1606939_640.png"
                          }
                          sx={{
                            display: "block",
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                            aspectRatio: 16 / 9
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            width: "max-content",
                            background: "#fff",
                            padding: "5px 15px",
                            lineHeight: 1,
                            borderRadius: "20px",
                            fontSize: "13px",
                            top: "10px",
                            left: "10px",
                            fontWeight: "500",
                          }}
                        >
                          {event.eventDate}
                        </Box>
                      </Box>
                      <Typography
                        variant="h5"
                        component="h5"
                        sx={{
                          textAlign: "center",
                          fontSize: "20px",
                        }}
                      >
                        {event.title}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: "20px",
                          pt: "10px",
                          borderTop: "1px solid #dddddd",
                        }}
                      >
                        <Box
                          sx={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            marginRight: "10px",
                          }}
                        >
                          <Box
                            component="img"
                            src={
                              event?.artist?.profilePicture
                                ? event.artist.profilePicture
                                : "https://cdn.pixabay.com/photo/2016/08/20/05/51/avatar-1606939_640.png"
                            }
                            sx={{
                              display: "block",
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                        <Typography
                          variant="h6"
                          component="h6"
                          sx={{
                            fontSize: "16px",
                          }}
                        >
                          {event.artist.name}
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Grid>
              ))}
            </Grid>
          ) : (
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
                No Event Added Yet!{" "}
              </Typography>
              <Link to="/dashboard/add-event">
                <Button variant="contained">Add An Event</Button>
              </Link>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default Events;
