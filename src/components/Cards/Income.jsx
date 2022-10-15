import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Balance = (props) => {
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
                $65k
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
              16%
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

export default Balance;
