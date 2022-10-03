import React from "react";
import { Box, Typography } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";

const SingleCategory = () => {
  return (
    <>
      <Box backgroundColor={"#202020"} width={"300px"} height={"70px"}>
        <Box alignItems="center" display={"flex"} padding={2}>
          <AppsIcon />
          <Typography fontSize={25} marginLeft={10}>
            Title
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default SingleCategory;
