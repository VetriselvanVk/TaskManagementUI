// SignIn.jsx
import React, { useState } from "react";
import { TextField, Button, Typography, Box, Container } from "@mui/material";
import api from "../apiClient/axiosInterceptor";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const handleSignIn = (e) => {
    e.preventDefault();
    // Example: handle authentication logic here
    console.log("Email:", email);
    console.log("Password:", password);
    const SignInData = {
      name: name,
      email: email,
      password: password,
    };

    api
      .post("/auth/register", SignInData)
      .then(() =>nav("/"))
      .catch((err) => console.error("Error fetching users:", err));
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSignIn} sx={{ mt: 1 }}>
          <TextField
            label="UserName"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
