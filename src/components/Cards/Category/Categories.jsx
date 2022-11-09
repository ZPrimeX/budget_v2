import React from "react";
import { Box, Card, CardHeader, Divider, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCategory } from "../../../redux/features/categorySlice";
import CreateCategory from "../../Modals/Category/CreateCategory";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const Category = (props) => {
  const categories = useSelector(selectCategory);
  return (
    <>
      <Card {...props}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <CreateCategory />
        </Box>
        <Divider />
        <CardHeader subtitle={`${categories.length} in total`} title="Categories" />
        <Divider />
        <List>
          {categories.map((category, i) => (
            <ListItem divider={i < categories.length - 1} key={category.id}>
              <ListItemText primary={category.title} />
              <Box display={"flex"} width={"100px"} height={"100%"} justifyContent="space-around">
                <IconButton edge="end" size="small">
                  <EditOutlinedIcon color="primary" />
                </IconButton>
                <IconButton edge="end" size="small">
                  <DeleteOutlineOutlinedIcon color="error" />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
};

export default Category;
