import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

export const Progress = (props) => {
  let time = new Date().toLocaleTimeString();
  let date = new Date().toLocaleDateString();

  const [ctime, setTime] = useState(time);
  const [cdate, setDate] = useState(date);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    date = new Date().toLocaleDateString();
    setDate(date);
    setTime(time);
  };
  setInterval(UpdateTime);

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Typography>{ctime}</Typography>
        <Typography>{cdate}</Typography>
      </CardContent>
    </Card>
  );
};
{
  /* <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            TASKS PROGRESS
          </Typography>
          <Typography color="textPrimary" variant="h4">
            75.5%
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "warning.main",
              height: 56,
              width: 56,
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress value={75.5} variant="determinate" />
      </Box> */
}
