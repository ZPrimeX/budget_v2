import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Budget = (props) => {
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
                $35k
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
          <Box
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
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Budget;
