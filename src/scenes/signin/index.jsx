import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Avatar,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { mockDataTeam } from "../../data/mockData";
import { client } from '../../db/client';
import { getUserSession } from '../../session/userSession';

const createAlert = async(alert, userName) => {
  await client.models.Alert.create({
    id: userName + "-" + alert.alert_id,
    userName: userName,
    ...alert,
  });
}

const getUser = async(userName) => {
  const { data: user, errors } = await client.models.User.get({
    userName: userName,
  });

  return user;
}

const createUser = async(userName) => {
  await client.models.User.create({
    userName: userName,
  });
}

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Check if the username is already in localStorage
  useEffect(() => {
    const checkSession = async() => {
      const userName = await getUserSession();
      if (userName) {
        navigate("/dashboard"); // Redirect to sign-in if username is not available
      }
    };
    checkSession();
  }, [navigate]);

  const handleSubmit = async(event) => {
    event.preventDefault();

    if (!username) {
      alert("Please enter a user name to sign in.");
      return;
    }

    if (username.trim().length === 0) {
      alert("User name can not be blank.");
      return;
    }

    // get a user by user name
    const user = await getUser(username);
    if (!user) {
      await createUser(username);
      // create brand new alerts for new user
      await Promise.all(mockDataTeam.map(alert => createAlert(alert, username)));
    } else if(user.isSurveyComplete) {
      alert("This user has completed the experience!");
      return;
    }

    // Save username to localStorage for use on other pages
    localStorage.setItem("username", username);

    // Navigate to the dashboard after saving the username
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "secondary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            placeholder="Enter username"
            fullWidth
            required
            autoFocus
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Capture input
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignInPage;
