import React from "react";
import { useDispatch } from "react-redux";
import { createWallet } from "../../../redux/features/walletSlice";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import FormProvider from "../FormProvider";
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import RHFTextField from "../RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFNumber from "../RHFNumber";

const WalletForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
    methods.reset({ title: "", balance: 0 });
  };

  const onSubmit = (data) => {
    dispatch(createWallet(data));
    handleClose();
  };

  const WalletSchema = Yup.object().shape({
    title: Yup.string().required("This field is required!"),
    balance: Yup.number().required("This field is required!"),
  });

  // * REACT HOOK FORM
  const methods = useForm({
    resolver: yupResolver(WalletSchema),
    defaultValues: {
      title: "",
      balance: "",
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
                <RHFNumber name={"balance"} label="Balance" inputId={"balance-input"} />
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
