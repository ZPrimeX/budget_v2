import React from "react";
import { Grid, Container, Box } from "@mui/material";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import Wallet from "../components/Cards/Wallet/Wallet";
import CreateWallet from "../components/Modals/Wallet/CreateWallet";

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
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                p: 2,
              }}
            >
              <CreateWallet />
            </Box>
            <Wallet />
          </Container>
        </Box>
      </Layout>
    </>
  );
};

export default wallets;
