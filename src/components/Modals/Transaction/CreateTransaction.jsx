import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Box, Modal, Card, Divider, CardHeader, CardContent, Grid, TextField, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { createTransaction } from "../../../redux/features/transactionSlice";
import { fetchCategories, selectCategory } from "../../../redux/features/categorySlice";
import { useForm } from "react-hook-form";
import RHFSelect from "../../Forms/RHFSelect";
import FormProvider from "../../Forms/FormProvider";
import RHFDate from "../../Forms/RHFDate";
import RHFTextField from "../../Forms/RHFTextField";
import { findWallet, selectCurrentWallet } from "../../../redux/features/walletSlice";

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

const CreateTransaction = () => {
  const dispatch = useDispatch();

  const categories = useSelector(selectCategory);
  const currentWallet = useSelector(selectCurrentWallet);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    methods.reset({ category_id: "", amount: "", note: "", date: dayjs(new Date()) });
  };

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // * REACT HOOK FORM
  const methods = useForm({
    defaultValues: {
      category_id: "",
      amount: "",
      note: "",
      date: dayjs(new Date()),
    },
  });

  const onSubmit = async (data) => {
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const numeral_month = months.indexOf(String(data.date).slice(8, 11).toLowerCase()) + 1;
    const day = String(data.date).slice(5, 7);
    const year = String(data.date).slice(12, 16);
    await dispatch(
      createTransaction({
        ...data,
        amount: +data.amount,
        //? "Thu, 01 Dec 2022"
        day_of_week: String(data.date).slice(0, 3),
        day: +day,
        month: numeral_month,
        year: +year,
        raw_date: +`${day}${numeral_month}${year}`,
        wallet_id: currentWallet?.id,
      })
    );
    dispatch(findWallet(currentWallet?.id));
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen} color="primary" endIcon={<AddCircleOutlineIcon />} size="medium" variant="text">
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
              <CardHeader subheader="Add a new transaction" title="Transaction" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <RHFSelect name={"category_id"} label="Category" inputId={"category-input"}>
                      {categories.map((c) => (
                        <MenuItem value={c.id} key={c.id}>
                          {c.title}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <RHFDate
                      name={"date"}
                      label="Date and Time"
                      inputId={"date-input"}
                      renderInput={(props) => <TextField {...props} helperText={null} />}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <RHFTextField name={"amount"} label="Amount" inputId={"amount-input"} />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <RHFTextField name={"note"} label="Note" inputId={"note-input"} />
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
                  Add
                </Button>
              </Box>
            </Card>
          </FormProvider>
        </Box>
      </Modal>
    </>
  );
};

export default CreateTransaction;
