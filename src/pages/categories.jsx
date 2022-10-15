import React from "react";
import { Box } from "@mui/material";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import RecentProducts from "../components/Cards/RecentProducts";

const Categories = () => {
  return (
    <>
      <Head>
        <title>Transactions</title>
      </Head>
      <Layout>
        <Box>
          <RecentProducts />
        </Box>
      </Layout>
    </>
  );
};

export default Categories;
