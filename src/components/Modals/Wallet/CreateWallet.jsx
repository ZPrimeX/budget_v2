import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Box, Modal, Card, Divider, CardHeader, CardContent, Grid, TextField, InputLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const WalletModal = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [balance, setBalance] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const clear = () => {
    handleClose();
    setTitle("");
    setBalance("");
  };

  const handleCreate = (e) => {
    e.preventDefault();
    // dispatch(createWallet({ title, balance }));
    clear();
  };

  // * REACT HOOK FORM
  const methods = useForm({
    defaultValues: {
      title: "",
      balance: 0,
    },
  });

  return (
    <>
      <Button onClick={handleOpen} color="primary" endIcon={<AddCircleOutlineIcon />} size="small" variant="text">
        Add new
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleCreate}>
          <Card>
            <CardHeader subheader="Add a new wallet" title="Wallet" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <InputLabel id="title">Title</InputLabel>
                  <Controller
                    name="title"
                    control={methods.control}
                    rules={{ required: true }}
                    render={({ field, fieldState: { error, isTouched } }) => (
                      <TextField
                        {...field}
                        labelId="title"
                        fullWidth
                        name="title"
                        required
                        helperText={error?.message}
                        error={error && isTouched}
                        sx={{ textTransform: "capitalize" }}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputLabel id="balance">Balance</InputLabel>
                  <Controller
                    name="balance"
                    control={methods.control}
                    rules={{ required: true }}
                    render={({ field, fieldState: { error, isTouched } }) => (
                      <TextField
                        {...field}
                        labelId="balance"
                        fullWidth
                        name="balance"
                        required
                        helperText={error?.message}
                        error={error && isTouched}
                        sx={{ textTransform: "capitalize" }}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 2,
              }}
            >
              <Button onClick={clear} color="error" size="small" variant="text">
                Cancel
              </Button>
              <Button type="submit" color="success" size="small" variant="text">
                Create
              </Button>
            </Box>
          </Card>
        </Box>
      </Modal>
    </>
  );
};

export default WalletModal;
