import React, { useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import axios from "axios";

const Signup = () => {
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [passwordShort, setPasswordShort] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");

  const checkUsername = async () => {
    if (username.length > 0) {
      const { data } = await axios.post("/api/user/validate", { username });

      if (data.message === "error") {
        setIsUsernameTaken(true);
      } else {
        setIsUsernameTaken(false);
      }
    }
  };

  useEffect(() => {
    checkUsername();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    if (password.length > 0 && password.length < 6) {
      setPasswordShort(true);
    } else {
      setPasswordShort(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  return (
    <>
      <Head>
        <title>Register | Material Kit</title>
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
          <form>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Create a new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your email to create a new account
              </Typography>
            </Box>
            <TextField
              fullWidth
              required
              label="Username"
              margin="normal"
              id="username"
              autoComplete="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
            />
            {isUsernameTaken ? (
              <Alert severity="error">This username is already taken</Alert>
            ) : (
              ""
            )}
            <TextField
              fullWidth
              required
              label="Email"
              margin="normal"
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              required
              label="Password"
              margin="normal"
              id="password"
              type="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
            {passwordShort ? (
              <Alert severity="error">
                Password has to be at least 6 characters
              </Alert>
            ) : (
              ""
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={isUsernameTaken}
              >
                {status === "loading" ? (
                  <CircularProgress sx={{ color: "white" }} />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Have an account?{" "}
              <NextLink href="/login">
                <Link variant="subtitle2" underline="hover">
                  Login
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Signup;
