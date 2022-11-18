import React, { useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Box, Button, Container, Link, TextField, Alert, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signup } from "../redux/features/authSlice";
import { useRouter } from "next/router";
import GoogleAuth from "../components/GoogleAuth/GoogleAuth";

const Signup = () => {
  const router = useRouter();
  const [isEmailTaken, setIsEmailTaken] = useState(false);
  const [passwordShort, setPasswordShort] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await dispatch(signup({ email, first_name, last_name, password }));
    if (res.payload?.message === "success") {
      router.push("/");
    }
  };

  const checkEmail = async () => {
    if (email.length > 0) {
      const { data } = await axios.post("/api/user/validate", { email });

      if (data.message === "error") {
        setIsEmailTaken(true);
      } else {
        setIsEmailTaken(false);
      }
    }
  };

  useEffect(() => {
    checkEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

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
        <title>Signup</title>
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
          <Box display={"flex"} alignItems="center" justifyContent={"center"}>
            <Typography color="textPrimary" variant="h4">
              Create a new account with
            </Typography>
          </Box>
          <Box display={"flex"} alignItems="center" justifyContent={"center"} mt={"20px"}>
            <GoogleAuth />
          </Box>
          <Box display={"flex"} alignItems="center" justifyContent={"center"} mt={"20px"}>
            <Typography color="textPrimary" variant="h6">
              or
            </Typography>
          </Box>
          <form onSubmit={handleSignup}>
            <Box sx={{ my: 3 }} display={"flex"} alignItems="center" justifyContent={"center"}>
              <Typography color="textPrimary" variant="h6">
                Fill out the information below
              </Typography>
            </Box>
            <TextField
              fullWidth
              required
              label="First Name"
              margin="normal"
              name="firstName"
              variant="outlined"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              fullWidth
              required
              label="Last Name"
              margin="normal"
              name="lastName"
              variant="outlined"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
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
            {passwordShort ? <Alert severity="error">Password has to be at least 6 characters</Alert> : ""}
            <Box sx={{ py: 2 }}>
              <Button color="primary" fullWidth size="large" type="submit" variant="contained" disabled={isEmailTaken}>
                Sign Up
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body1">
              Have an account?{" "}
              <NextLink href="/login">
                <Link
                  variant="subtitle1"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
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
