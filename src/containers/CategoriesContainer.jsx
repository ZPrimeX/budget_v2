import React from "react";
import { Box } from "@mui/material";
import SingleCategory from "../components/Cards/SingleCategory/SingleCategory";

const CategoriesContainer = () => {
  return (
    <>
      <Box padding={5}>
        <Box display={"flex"} flexDirection="column" gap={3}>
          <SingleCategory />
          <SingleCategory />
          <SingleCategory />
          <SingleCategory />
          <SingleCategory />
        </Box>
      </Box>
    </>
  );
};

export default CategoriesContainer;
