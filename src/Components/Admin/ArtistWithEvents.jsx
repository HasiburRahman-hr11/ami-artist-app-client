import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";

export const ArtistWithEvents = () => {
  const [allArtist, setAllArtist] = useState([]);
  const [artistEvents, setArtistEvents] = useState([]);
  const [loadingAllArtist, setLoadingAllArtist] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [currentlySelectedArtist, setCurrentlySelectedArtist] = useState({});

  useEffect(() => {
    const getAllArtistFromDB = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/artist/all`
        );
        if (res.data && res.data?.length > 0) {
          setAllArtist(res.data);
          setCurrentlySelectedArtist(res.data[0]);
        }
        setLoadingAllArtist(false);
      } catch (error) {
        console.log(error);
        setLoadingAllArtist(false);
      }
    };
    getAllArtistFromDB();
  }, []);

  useEffect(() => {
    const getEventsByArtist = async () => {
      setLoadingEvents(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/event/all/${currentlySelectedArtist._id}`
        );
        if (res.data) {
          setArtistEvents(res.data);
        }
        setLoadingEvents(false);
      } catch (error) {
        console.log(error);
        setLoadingEvents(false);
      }
    };
    if (currentlySelectedArtist && currentlySelectedArtist?._id) {
      getEventsByArtist();
    }
  }, [currentlySelectedArtist]);
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
          {allArtist.length > 0 ? (
            <Grid
              container
              spacing={5}
              sx={{
                position: "relative",
              }}
            >
              <Grid size={6}>
                <Box
                  className="artist-scrollbar"
                  component="ul"
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    listStyle: "none",
                    maxHeight: "calc(100vh - 132px)",
                    overflowY: "auto",
                    pb: "50px",
                    paddingRight: "20px",
                  }}
                >
                  {allArtist.map((artist, index) => (
                    <Box
                      component="li"
                      key={`artist-${index}`}
                      sx={{
                        width: "47%",
                        backgroundColor: "#fff",
                        padding: "25px",
                        borderRadius: "8px",
                        marginBottom: "20px",
                        cursor: "pointer",
                        boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
                      }}
                      onClick={() => setCurrentlySelectedArtist(artist)}
                    >
                      <Box
                        sx={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          overflow: "hidden",
                          margin: "0 auto 20px auto",
                        }}
                      >
                        <Box
                          component="img"
                          src={
                            artist?.profilePicture
                              ? artist.profilePicture
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
                        variant="h5"
                        component="h5"
                        sx={{
                          textAlign: "center",
                          fontSize: "20px",
                        }}
                      >
                        {artist.name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid size={6} sx={{ position: "relative" }}>
                <Box sx={{}}>
                  {loadingEvents ? (
                    <Box
                      sx={{
                        padding: "100px",
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h6">loading Events...</Typography>
                    </Box>
                  ) : (
                    <>
                      {artistEvents.length > 0 ? (
                        <Box>
                          <Box
                            className="artist-scrollbar"
                            sx={{
                              maxHeight: "calc(100vh - 132px)",
                              overflowY: "auto",
                              pb: "50px",
                              paddingRight: "20px",
                            }}
                          >
                            {artistEvents.map((event, index) => (
                              <Box
                                key={`event-${index}`}
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
                                      height: "100%",
                                      objectFit: "cover",
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
                            ))}
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            padding: "100px",
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6">
                            No Events Found for {currentlySelectedArtist.name}
                          </Typography>
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              </Grid>
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
                No Artist Added Yet!{" "}
              </Typography>
              <Link to="/dashboard/add-artist">
                <Button variant="contained">Add An Artist</Button>
              </Link>
            </Box>
          )}
        </>
      )}
    </>
  );
};
