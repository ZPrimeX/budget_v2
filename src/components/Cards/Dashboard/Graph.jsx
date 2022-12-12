import React from "react";
import { Bar } from "react-chartjs-2";
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useSelector } from "react-redux";
import { selectBarChart } from "../../../redux/features/dashboardSlice";
import dayjs from "dayjs";

const Graph = (props) => {
  const barChart = useSelector(selectBarChart);

  const theme = useTheme();

  const day1 = dayjs(new Date()).format("ddd DD/MM/YYYY");
  const day2 = dayjs(new Date() - 24 * 60 * 60 * 1000).format("ddd DD/MM/YYYY"); // 1 day ago from now in milliseconds (24 hours) (60 minutes) (60 seconds) (1000 milliseconds) = 86400000 milliseconds = 1 day
  const day3 = dayjs(new Date() - 2 * 24 * 60 * 60 * 1000).format("ddd DD/MM/YYYY");
  const day4 = dayjs(new Date() - 3 * 24 * 60 * 60 * 1000).format("ddd DD/MM/YYYY");
  const day5 = dayjs(new Date() - 4 * 24 * 60 * 60 * 1000).format("ddd DD/MM/YYYY");
  const day6 = dayjs(new Date() - 5 * 24 * 60 * 60 * 1000).format("ddd DD/MM/YYYY");
  const day7 = dayjs(new Date() - 6 * 24 * 60 * 60 * 1000).format("ddd DD/MM/YYYY");

  const dates = [day7, day6, day5, day4, day3, day2, day1];

  const data = {
    datasets: [
      {
        backgroundColor: "#14B8A6",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 0,
        categoryPercentage: 0.5,
        data: barChart.income,
        label: "Income",
        maxBarThickness: 10,
      },
      {
        backgroundColor: "#D14343",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 0,
        categoryPercentage: 0.5,
        data: barChart.expense,
        label: "Expense",
        maxBarThickness: 10,
      },
    ],
    labels: dates,
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider,
        },
      },
    ],
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
  return (
    <>
      <Card {...props}>
        <CardHeader
          action={
            <Button endIcon={<ArrowDropDownIcon fontSize="small" />} size="small">
              Last 7 days
            </Button>
          }
          title="Latest Stats"
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 400,
              position: "relative",
            }}
          >
            <Bar data={data} options={options} />
          </Box>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" endIcon={<ArrowRightIcon fontSize="small" />} size="small">
            Overview
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default Graph;
