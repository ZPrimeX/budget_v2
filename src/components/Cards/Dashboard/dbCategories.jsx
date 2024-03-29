import React from "react";
import { Card, CardHeader, Divider, IconButton, List, ListItem, ListItemText } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import { selectCategory } from "../../../redux/features/categorySlice";

const Categories = (props) => {
  const categories = useSelector(selectCategory);
  return (
    <>
      <Card {...props}>
        <Divider />
        <CardHeader subtitle={`${categories.length} in total`} title="Categories" />
        <Divider />
        <List>
          {categories.map((category, i) => (
            <ListItem divider={i < categories.length - 1} key={category.id}>
              <ListItemText
                primary={category.title}
                // secondary={`Payed ${formatDistanceToNow(product.updatedAt)} ago`}
              />
              <IconButton edge="end" size="small">
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
};

export default Categories;
