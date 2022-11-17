import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { FormProvider } from "../FormProvider";
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { RHFTextField } from "../RHFTextField";
import { createWallet, editWallet } from "../../../redux/features/walletSlice";

const WalletForm = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    methods.reset({ title: "", balance: 0 });
  };

  const onSubmit = (data) => {
    if (editMode) {
      dispatch(editWallet({ id: wallet.id, body: data }));
    } else {
      dispatch(createWallet(data));
    }
    handleClose();
  };

  const WalletSchema = Yup.object().shape({
    title: Yup.string().required("This field is required!"),
  });

  // * REACT HOOK FORM
  const methods = useForm({
    resolver: yupResolver(WalletSchema),
    defaultValues: {
      title: wallet?.title || "",
      balance: wallet.balance || 0,
    },
  });

  return (
    <>
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
    </>
  );
};

export default WalletForm;
