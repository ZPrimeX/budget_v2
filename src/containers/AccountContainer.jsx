import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../core/redux/features/authSlice";

const AccountContainer = () => {
  const user = useSelector(selectUser);
  return (
    <>
      <Box
        padding={10}
        display="flex"
        flexDirection={"column"}
        paddingLeft={100}
      >
        <Typography variant="h3" fontWeight={700}>
          Account Overview
        </Typography>
        <Box
          display="flex"
          flexDirection={"row"}
          alignItems="center"
          justifyContent={"space-between"}
          width="500px"
        >
          <Box mt={5} display="flex" flexDirection={"column"} gap={2}>
            <Typography fontWeight={700} fontSize={20}>
              Username
            </Typography>
            <Typography fontWeight={700} fontSize={20}>
              Email
            </Typography>
            <Typography fontWeight={700} fontSize={20}>
              Date of birth
            </Typography>
            <Typography fontWeight={700} fontSize={20}>
              Country or region
            </Typography>
          </Box>
          <Box mt={5} display="flex" flexDirection={"column"} gap={2}>
            <Typography fontWeight={500} fontSize={18}>
              {user.username}
            </Typography>
            <Typography fontWeight={500} fontSize={18}>
              {user.email}
            </Typography>
            <Typography fontWeight={500} fontSize={18}>
              to be added
            </Typography>
            <Typography fontWeight={500} fontSize={18}>
              to be added
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AccountContainer;
