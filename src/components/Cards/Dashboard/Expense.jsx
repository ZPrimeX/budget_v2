import React from "react";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useSelector } from "react-redux";
import { selectSummary } from "../../../redux/features/dashboardSlice";

const Budget = (props) => {
  const summary = useSelector(selectSummary);
  return (
    <>
      <Card sx={{ height: "100%" }} {...props}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                EXPENSE
              </Typography>
              <Typography color="textPrimary" variant="h4">
                $ {!summary.expense ? 0 : summary.expense}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "error.main",
                  height: 56,
                  width: 56,
                }}
              >
                <RemoveCircleOutlineIcon />
              </Avatar>
            </Grid>
          </Grid>
          {/* <Box
            sx={{
              pt: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <ArrowDownwardIcon color="error" />
            <Typography
              color="error"
              sx={{
                mr: 1,
              }}
              variant="body2"
            >
              12%
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

export default Budget;
