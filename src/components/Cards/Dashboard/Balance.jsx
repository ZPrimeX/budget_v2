import React from "react";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { selectSummary } from "../../../redux/features/dashboardSlice";
import { useSelector } from "react-redux";

const TotalProfit = (props) => {
  const summary = useSelector(selectSummary);
  return (
    <>
      <Card {...props}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                BALANCE
              </Typography>
              <Typography color="textPrimary" variant="h4">
                ${summary.balance}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "primary.main",
                  height: 56,
                  width: 56,
                }}
              >
                <AttachMoneyIcon />
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
              24%
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

export default TotalProfit;
