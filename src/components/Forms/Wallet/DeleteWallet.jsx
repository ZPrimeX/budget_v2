import React from "react";
import { useDispatch } from "react-redux";
import { deleteWallet } from "../../../redux/features/walletSlice";
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, Typography } from "@mui/material";

const DeleteWallet = ({ onClose, id }) => {
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(deleteWallet({ id: id }));
    onClose;
  };

  return (
    <>
      <Box component={"form"} onSubmit={onSubmit}>
        <Card>
          <CardHeader title="Are you sure?" />
          <Divider />
          <CardContent>
            <Typography>All the transactions associated with this wallet will also be deleted!</Typography>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Button onClick={onClose} color="primary" size="small" variant="text">
              Cancel
            </Button>
            <Button type="submit" color="error" size="small" variant="text">
              Delete
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default DeleteWallet;
