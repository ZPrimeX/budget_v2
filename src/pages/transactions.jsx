import { Box } from "@mui/material";
import Head from "next/head";
import React from "react";
import Layout from "../components/Layout/Layout";
import RecentTransactions from "../components/Cards/RecentTransactions";

const Transactions = () => {
  return (
    <>
      <Head>
        <title>Transactions</title>
      </Head>
      <Layout>
        <Box>
          <RecentTransactions />
        </Box>
      </Layout>
    </>
  );
};

export default Transactions;
