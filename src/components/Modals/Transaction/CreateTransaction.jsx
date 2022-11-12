import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Button,
  Box,
  Modal,
  Card,
  Divider,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { createTransaction } from "../../../redux/features/transactionSlice";
import { fetchCategories, selectCategory } from "../../../redux/features/categorySlice";
import { useForm } from "react-hook-form";
import RHFSelect from "../../Forms/RHFSelect";
import FormProvider from "../../Forms/FormProvider";
import RHFDate from "../../Forms/RHFDate";
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

const CreateTransaction = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategory);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    methods.reset({ category: "", amount: "", note: "", date: dayjs(new Date()) });
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
      category: "",
      amount: "",
      note: "",
      date: dayjs(new Date()),
    },
  });

  const onSubmit = (data) => {
    dispatch(createTransaction(data));
    methods.reset({ category: "", amount: "", note: "", date: dayjs(new Date()) });
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
                    <RHFSelect name={"category"} label="Category" inputId={"category-input"}>
                      <InputLabel id="select">Category</InputLabel>
                      {categories.map((c) => (
                        <MenuItem value={c.id} key={c.id}>
                          {c.title}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </Grid>
                  <Grid item md={6} xs={12} marginTop={3}>
                    <RHFDate
                      name={"date"}
                      label="Date and Time"
                      inputId={"date-input"}
                      renderInput={(props) => <TextField {...props} size="small" helperText={null} />}
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
