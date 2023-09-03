import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  logIn: () => void;
};

function Login({ logIn }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFunction: (a: string) => void
  ) => {
    if (e.target.value != null) {
      setFunction(e.target.value);
    }
  };

  const resetState = () => {
    setUsername("");
    setPassword("");
    setError(false);
  };

  const handleLogin = () => {
    const reqBody = {
      Username: username.trim(),
      Password: password,
    };
    fetch("https://note-api-v1.onrender.com/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(reqBody),
    }).then(
      (result) => {
        if (result.ok) {
          logIn();
          console.log("Successful login");
          resetState();
          navigate("/note-taking-app/");
        } else {
          console.error(result);
          setError(true);
        }
      },
      (error) => {
        resetState();
        setError(true);
        console.error(error);
      }
    );
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        bgcolor: "#FCF6E9",
        height: { xs: "calc(100vh - 60px)", md: "calc(100vh - 70px)" },
        py: 4,
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Login
      </Typography>
      <Box
        sx={{
          width: "85vw",
          height: "100%",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          py: 9,
        }}
      >
        <TextField
          required
          id="username-input"
          label="Username"
          variant="outlined"
          sx={{ width: "60%", mx: "auto" }}
          value={username}
          onChange={(e) => {
            handleChange(e, setUsername);
          }}
        />

        <TextField
          required
          id="password-input"
          label="Password"
          variant="outlined"
          type="password"
          sx={{ width: "60%", mx: "auto" }}
          value={password}
          onChange={(e) => {
            handleChange(e, setPassword);
          }}
        />

        <Button
          variant="contained"
          sx={{ width: "60%", mx: "auto" }}
          onClick={handleLogin}
        >
          Login
        </Button>
        {error && (
          <Typography variant="h6" sx={{ color: "red", textAlign: "center" }}>
            Incorrect username or password
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default Login;
