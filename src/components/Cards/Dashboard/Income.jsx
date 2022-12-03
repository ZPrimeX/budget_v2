import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useSelector } from "react-redux";
import { selectSummary } from "../../../redux/features/dashboardSlice";

const Balance = (props) => {
  const summary = useSelector(selectSummary);
  return (
    <>
      <Card {...props}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                INCOME
              </Typography>
              <Typography color="textPrimary" variant="h4">
                ${summary.income}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "success.main",
                  height: 56,
                  width: 56,
                }}
              >
                <AddCircleOutlineIcon />
              </Avatar>
            </Grid>
          </Grid>
          {/* <Box
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
              color="#14B8A6"
            >
              16%
            </Typography>
            <Typography color="textSecondary" variant="caption">
              Since last month
            </Typography>
          </Box> */}
        </CardContent>
      </Card>
    </>
  );
};

export default Balance;
