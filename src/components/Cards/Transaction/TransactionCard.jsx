import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import TransactionSubcard from "./TransactionSubcard";

const TransactionCard = () => {
  return (
    <>
      <Box p={2}>
        <Box display={"flex"} justifyContent="space-between">
          <Box display={"flex"} flexDirection="column">
            <Typography>Salary</Typography>
            <Typography>0 Transactions</Typography>
          </Box>
          <Typography color={"colors.lime"}>+$ 0</Typography>
        </Box>
      </Box>
      <hr />
      <TransactionSubcard />
    </>
  );
};

export default TransactionCard;
