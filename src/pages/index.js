import Head from "next/head";
import Layout from "../components/Layout/Layout";
import { Box, Container, Grid } from "@mui/material";
import Budget from "../components/Cards/Budget";
import Balance from "../components/Cards/Balance";
import TotalProfit from "../components/Cards/TotalProfit";
import Graph from "../components/Cards/Graph";
import CircularProgress from "../components/Cards/CircularProgress";
import RecentTransactions from "../components/Cards/RecentTransactions";
import { Progress } from "../components/Cards/Progress";
import { RecentProducts } from "../components/Cards/RecentProducts";

export default function Dashboard() {
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
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Budget />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <Balance />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <TotalProfit sx={{ height: "100%" }} />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <Progress />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <Graph />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <CircularProgress sx={{ height: "100%" }} />
              </Grid>
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <RecentProducts sx={{ height: "100%" }} />
              </Grid>
              <Grid item lg={8} md={12} xl={9} xs={12}>
                <RecentTransactions />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    </>
  );
}
