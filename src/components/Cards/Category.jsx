import React from "react";
import { formatDistanceToNow, subHours } from "date-fns";
import { v4 as uuid } from "uuid";
import { Box, Button, Card, CardHeader, Divider, IconButton, List, ListItem, ListItemText } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const products = [
  {
    id: uuid(),
    name: "Gas",
    updatedAt: subHours(Date.now(), 2),
  },
  {
    id: uuid(),
    name: "Water",
    updatedAt: subHours(Date.now(), 2),
  },
  {
    id: uuid(),
    name: "Electricity",
    updatedAt: subHours(Date.now(), 3),
  },
  {
    id: uuid(),
    name: "Rent",
    updatedAt: subHours(Date.now(), 5),
  },
  {
    id: uuid(),
    name: "Groceries",
    updatedAt: subHours(Date.now(), 9),
  },
];

const RecentProducts = (props) => (
  <Card {...props}>
    <CardHeader subtitle={`${products.length} in total`} title="Categories" />
    <Divider />
    <List>
      {products.map((product, i) => (
        <ListItem divider={i < products.length - 1} key={product.id}>
          <ListItemText primary={product.name} secondary={`Payed ${formatDistanceToNow(product.updatedAt)} ago`} />
          <IconButton edge="end" size="small">
            <MoreVertIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        p: 2,
      }}
    >
      <Button color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text">
        View all
      </Button>
    </Box>
  </Card>
);

export default RecentProducts;