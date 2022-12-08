import React from "react";
import { useDispatch } from "react-redux";
import { editWallet } from "../../../redux/features/walletSlice";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import FormProvider from "../FormProvider";
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import RHFTextField from "../RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";

const EditWallet = ({ onClose, title, id }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
    methods.reset({ title: title });
  };

  const onSubmit = (data) => {
    dispatch(editWallet({ id: id, body: data }));
    handleClose();
  };

  const WalletSchema = Yup.object().shape({
    title: Yup.string().required("This field is required!"),
  });

  // * REACT HOOK FORM
  const methods = useForm({
    resolver: yupResolver(WalletSchema),
    defaultValues: {
      title: title || "",
    },
  });

  return (
    <>
      <FormProvider onSubmit={methods.handleSubmit(onSubmit)} methods={methods}>
        <Card>
          <CardHeader subheader="Add a new title" title="Wallet Title" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <RHFTextField name={"title"} label="Title" inputId={"title-input"} />
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
              Save
            </Button>
          </Box>
        </Card>
      </FormProvider>
    </>
  );
};

export default EditWallet;
