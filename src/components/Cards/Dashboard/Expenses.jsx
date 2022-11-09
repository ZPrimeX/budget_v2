import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const CircularProgress = (props) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [37, 43, 20],
        backgroundColor: ["#3F51B5", "#e53935", "#FB8C00"],
        borderWidth: 8,
        borderColor: "#FFFFFF",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    labels: ["Gas", "Electricity", "Water"],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  const devices = [
    {
      title: "Gas",
      value: 37,
      icon: AddCircleOutlineIcon,
      color: "#3F51B5",
    },
    {
      title: "Electricity",
      value: 43,
      icon: RemoveCircleOutlineIcon,
      color: "#E53935",
    },
    {
      title: "Water",
      value: 20,
      icon: RemoveCircleOutlineIcon,
      color: "#FB8C00",
    },
  ];
  return (
    <>
      <Card {...props}>
        <CardHeader title="Expenses" />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 300,
              position: "relative",
            }}
          >
            <Doughnut data={data} options={options} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 2,
            }}
          >
            {devices.map(({ color, icon: Icon, title, value }) => (
              <Box
                key={title}
                sx={{
                  p: 1,
                  textAlign: "center",
                }}
              >
                <Icon color="action" />
                <Typography color="textPrimary" variant="body1">
                  {title}
                </Typography>
                <Typography style={{ color }} variant="h4">
                  {value}%
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default CircularProgress;