import React from "react";
import Head from "next/head";
import NextLink from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import AccountProfile from "../components/Account/AccountProfile";
import AccountDetails from "../components/Account/AccountDetails";
import Layout from "../components/Layout/Layout";

const Account = () => {
  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <NextLink href="/" passHref>
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink>
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Account;
