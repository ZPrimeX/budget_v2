import React from "react";
import { Avatar, Card, CardContent, Grid, Typography, Box } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const Wallet = (props) => {
  return (
    <>
      <Card {...props}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                Wallet
              </Typography>
              <Typography color="textPrimary" variant="h4">
                $110k
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "primary.main",
                  height: 60,
                  width: 60,
                }}
              >
                <AttachMoneyIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              pt: 2,
            }}
          >
            <ArrowUpwardIcon color="success" />
            <Typography
              variant="body2"
              sx={{
                mr: 1,
              }}
            >
              15%
            </Typography>
            <Typography color="textSecondary" variant="caption">
              Since last month
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Wallet;
