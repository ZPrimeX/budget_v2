import React from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { Google as GoogleIcon } from "../icons/google";
import { useRouter } from "next/router";
import { login, selectUser } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await dispatch(login({ password, email }));
    if (res.payload?.message === "success") {
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
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
          <form onSubmit={handleLogin}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Log in
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  color="info"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  size="large"
                  variant="contained"
                >
                  Login with Facebook
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  color="error"
                  fullWidth
                  size="large"
                  startIcon={<GoogleIcon />}
                  variant="contained"
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                or login with email address
              </Typography>
            </Box>
            <TextField
              fullWidth
              required
              label="Email Address"
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
              variant="outlined"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                {user.status === "loading" ? (
                  <CircularProgress sx={{ color: "white" }} />
                ) : (
                  "Log In"
                )}
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account?{" "}
              <NextLink href="/signup">
                <Link
                  to="/signup"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
