import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import { Link } from "react-router-dom";

const Artist = () => {
  const [allArtist, setAllArtist] = useState([]);
  const [loadingAllArtist, setLoadingAllArtist] = useState(true);

  useEffect(() => {
    const getAllArtistFromDB = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/artist/all`
        );
        if (res.data && res.data?.length > 0) {
          console.log("All Artist --", res.data);
          setAllArtist(res.data);
        }
        setLoadingAllArtist(false);
      } catch (error) {
        console.log(error);
        setLoadingAllArtist(false);
      }
    };
    getAllArtistFromDB();
  }, []);

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
        <Box sx={{ pb:'50px'}}>
          <Typography
            variant="h5"
            sx={{
              mb: "70px",
            }}
          >
            Showing All Artists
          </Typography>

          {allArtist.length > 0 ? (
            <Grid container spacing={4}>
              {allArtist.map((artist, index) => (
                <Grid size={4} key={index}>
                  <Link
                    to={`/dashboard/edit-artist/${artist._id}`}
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
                No Artist Added Yet!{" "}
              </Typography>
              <Link to="/dashboard/add-artist">
                <Button variant="contained">Add An Artist</Button>
              </Link>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default Artist;
