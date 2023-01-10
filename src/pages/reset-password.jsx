import React, { useState } from "react";
import { Box, Typography, TextField, Button, CircularProgress, Container } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const res = await axios.patch(
        "/api/user/reset-password",
        { password },
        {
          headers: { Authorization: `Bearer ${router.query.token}` },
        }
      );
      alert(JSON.stringify(res.data));
    }
  };
  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ my: 3 }} display={"flex"} alignItems="center" justifyContent={"center"}>
            <Typography color="textPrimary" variant="h4">
              Enter a new password
            </Typography>
          </Box>
          <Box
            sx={{
              pb: 1,
              pt: 3,
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {status === "loading" ? <CircularProgress sx={{ color: "white" }} /> : "Save"}
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ResetPassword;
