import React from "react";
import { Bar } from "react-chartjs-2";
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBarChart, selectBarChart } from "../../../redux/features/dashboardSlice";

const Graph = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBarChart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const barchart = useSelector(selectBarChart);

  const theme = useTheme();

  const data = {
    datasets: [
      {
        backgroundColor: "#14B8A6",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: barchart.income,
        label: "Income",
        maxBarThickness: 10,
      },
      {
        backgroundColor: "#D14343",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: barchart.expense,
        label: "Expense",
        maxBarThickness: 10,
      },
    ],
    labels: barchart.labels ? barchart.labels : [],
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
