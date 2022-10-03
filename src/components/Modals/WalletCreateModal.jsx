import React, { useState } from "react";
import { Button, Modal, Grid, Box, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { createWallet } from "../../core/redux/features/walletSlice";

const style = {
  position: "absolute",
  top: "22%",
  left: "60%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const WalletCreateModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [initial_balance, setInitialBalance] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createWallet({ title, initial_balance }));
  };

  return (
    <>
      <Button
        variant="outlined"
        sx={{ color: "colors.lime" }}
        onClick={handleOpen}
      >
        Add A New Wallet
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box component={"form"} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label={"Wallet Name"}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  type={"number"}
                  label={"Initial Balance"}
                  value={initial_balance}
                  onChange={(e) => setInitialBalance(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ color: "colors.lime" }}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default WalletCreateModal;
