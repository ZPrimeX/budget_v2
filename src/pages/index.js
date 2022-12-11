import Head from "next/head";
import Layout from "../components/Layout/Layout";
import { Box, Container, Grid } from "@mui/material";
import Expense from "../components/Cards/Dashboard/Expense";
import Income from "../components/Cards/Dashboard/Income";
import Balance from "../components/Cards/Dashboard/Balance";
import Graph from "../components/Cards/Dashboard/Graph";
import Expenses from "../components/Cards/Dashboard/Expenses";
import Transactions from "../components/Cards/Dashboard/dbTransactions";
import { Datetime } from "../components/Cards/Dashboard/Datetime";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBarChart, fetchSummary } from "../redux/features/dashboardSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSummary());
    dispatch(fetchBarChart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <title>Dashboard</title>
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
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <Balance sx={{ height: "100%" }} />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <Income />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Expense />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <Datetime />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <Graph />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <Expenses sx={{ height: "100%" }} />
              </Grid>
              {/* <Grid item lg={4} md={6} xl={3} xs={12}>
                <Category sx={{ height: "100%" }} />
              </Grid> */}
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <Transactions />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    </>
  );
}
