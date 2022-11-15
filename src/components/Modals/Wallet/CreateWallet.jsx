import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Box, Modal, Card, Divider, CardHeader, CardContent, Grid, TextField, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import FormProvider from "../../Forms/FormProvider";
import { createWallet, fetchWallets, selectWallet } from "../../../redux/features/walletSlice";
import RHFTextField from "../../Forms/RHFTextField";

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

const WalletModal = ({onClose, wallet, editMode = false}) => {
  const wallets = useSelector(selectWallet);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    if (!wallets.length) {
      dispatch(fetchWallets());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // * REACT HOOK FORM
  const methods = useForm({
    defaultValues: {
      title: "",
      balance: 0,
    },
  });

  const onSubmit = (data) => {
    dispatch(createWallet(data));
    handleClose()
  };

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
        <Box sx={style}>
          <FormProvider onSubmit={methods.handleSubmit(onSubmit)} methods={methods}>
            <Card>
              <CardHeader subheader="Add a new wallet" title="Wallet" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <RHFTextField name={"title"} label="Title" inputId={"title-input"} />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <RHFTextField name={"balance"} label="Balance" inputId={"balance-input"} type="number" />
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
                <Button onClick={handleClose} color="error" size="small" variant="text">
                  Cancel
                </Button>
                <Button type="submit" color="success" size="small" variant="text">
                  Create
                </Button>
              </Box>
            </Card>
          </FormProvider>
        </Box>
      </Modal>
    </>
  );
};

export default WalletModal;
