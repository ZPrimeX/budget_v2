import React from "react";
import { Box } from "@mui/material";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import Category from "../components/Cards/Category";

const Categories = () => {
  return (
    <>
      <Head>
        <title>Transactions</title>
      </Head>
      <Layout>
        <Box>
          <Category />
        </Box>
      </Layout>
    </>
  );
};

export default Categories;