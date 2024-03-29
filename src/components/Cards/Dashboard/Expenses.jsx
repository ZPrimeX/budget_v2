import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { selectExpenses } from "../../../redux/features/dashboardSlice";

const ExpenseDoughnut = (props) => {
  const expenses = useSelector(selectExpenses);
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: expenses.amount || [],
        backgroundColor: expenses.colors || [],
        borderWidth: 1,
        borderColor: "#FFFFFF",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    labels: expenses.titles || [],
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
              flexWrap: "wrap",
              justifyContent: "center",
              pt: 2,
            }}
          >
            {expenses?.all?.map(({ amount, title, colors }) => (
              <Box
                key={title}
                sx={{
                  p: 1,
                  textAlign: "center",
                }}
              >
                <Typography color="textPrimary" variant="body1">
                  {title}
                </Typography>
                <Typography style={{ color: colors }} variant="h4">
                  {amount}%
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ExpenseDoughnut;
