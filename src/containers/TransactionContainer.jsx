import React from "react";
import { Box, Button, Typography } from "@mui/material";
import TransactionCard from "../components/Cards/Transaction/TransactionCard";

const TransactionContainer = () => {
  return (
    <>
      <Box height={"100%"} width={"100%"} p={5}>
        <Box backgroundColor={"#181818"} height={"100%"} width={"750px"}>
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
            gap={2}
            paddingTop={1}
          >
            <Button variant="text">Last Month</Button>
            <Button variant="text" sx={{ color: "colors.aqua" }}>
              This Month
            </Button>
            <Button variant="text">Future</Button>
          </Box>
          <hr />
          <Box p={2} display="flex" justifyContent={"space-between"}>
            <Box>
              <Typography>Inflow</Typography>
              <Typography>Outflow</Typography>
            </Box>
            <Box>
              <Typography color={"colors.lime"}>+$ 0</Typography>
              <Typography color={"colors.red"}>-$ 0</Typography>
              <hr />
              <Typography>$ 0</Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent="center">
            <Button sx={{ color: "colors.aqua" }}>
              VIEW REPORT FOR THIS PERIOD
            </Button>
          </Box>
          <Box
            backgroundColor={"#101010"}
            height={"30px"}
            width={"750px"}
          ></Box>
          <TransactionCard />
        </Box>
      </Box>
    </>
  );
};

export default TransactionContainer;
