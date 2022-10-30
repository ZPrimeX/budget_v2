import React from "react";
import { Grid, Container, Box } from "@mui/material";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import Balance from "../components/Cards/Dashboard/Balance";

const wallets = () => {
  return (
    <>
      <Head>
        <title>Wallets</title>
      </Head>
      <Layout>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Balance />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Balance />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Balance />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    </>
  );
};

export default wallets;
