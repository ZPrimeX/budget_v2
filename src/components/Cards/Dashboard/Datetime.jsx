import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

export const Datetime = (props) => {
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
  //TODO: add a dark mode/light mode button next to time and change the time font
  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Typography>{ctime}</Typography>
        <Typography>{cdate}</Typography>
      </CardContent>
    </Card>
  );
};
