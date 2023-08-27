import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFunction: (a: string) => void
  ) => {
    if (e.target.value != null) {
      setFunction(e.target.value);
    }
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
      <Typography variant="h4">Register</Typography>
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

        <Button variant="contained" sx={{ width: "60%", mx: "auto" }}>
          Register
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
