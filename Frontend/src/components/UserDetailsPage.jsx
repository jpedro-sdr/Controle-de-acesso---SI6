import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import axios from "axios";

const UserDetailsPage = () => {
  const [status, setStatus] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    time: 99,
    room: "101A",
  });

  const checkIn = async () => {
    setStatus(!status);

    try {
      const response = await axios.get(
        "https://us-central1-seminariossi6.cloudfunctions.net/agendar"
      );
      console.log(response.data);
      await fetchUserData();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://us-central1-seminariossi6.cloudfunctions.net/check"
      );
      console.log(response.data);
      const data = response.data;
      setStatus(data.dentro);
      setUser({ room: "Sala A", name: data.nome, time: data.tempoRestante });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    const interval = setInterval(() => {
      fetchUserData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {status ? (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              User Details
            </Typography>
            <Typography variant="h4" gutterBottom>
              Name: {user.name}
            </Typography>
            <Typography variant="h4" gutterBottom>
              Time: {user.time} minutes
            </Typography>
            <Typography variant="h4" gutterBottom>
              Room: {user.room}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              User with no room
            </Typography>
          </>
        )}
        <Button size="lg" variant="contained" color="primary" onClick={checkIn}>
          <Typography variant="h4">
            {status ? "Clock out" : "Clock in"}
          </Typography>
        </Button>
      </Box>
    </Container>
  );
};

export default UserDetailsPage;
