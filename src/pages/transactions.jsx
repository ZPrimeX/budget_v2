import { Box } from "@mui/material";
import Head from "next/head";
import React from "react";
import Layout from "../components/Layout/Layout";
import Transaction from "../components/Cards/Transaction/Transactions";

const Transactions = () => {
  return (
    <>
      <Head>
        <title>Transactions</title>
      </Head>
      <Layout>
        <Box>
          <Transaction />
        </Box>
      </Layout>
    </>
  );
};

export default Transactions;
