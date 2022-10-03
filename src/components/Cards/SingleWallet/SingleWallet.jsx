import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const SingleWallet = (props) => {
  return (
    <>
      <Box display={"flex"} alignItems="center">
        <Avatar src={props.img} />
        <Box display={"flex"} flexDirection="row" ml={2}>
          <Typography>{props.title}</Typography>
          <Box display={"flex"}>
            <AttachMoneyIcon />
            <Typography>{props.balance}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SingleWallet;
