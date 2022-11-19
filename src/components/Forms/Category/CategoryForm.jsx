import React from "react";
import { Button, Card, CardContent, CardHeader, Divider, Grid, MenuItem, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import FormProvider from "../FormProvider";
import RHFSelect from "../RHFSelect";
import RHFTextField from "../RHFTextField";
import { createCategory, editCategory } from "../../../redux/features/categorySlice";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const CategoryForm = ({ onClose, editMode = false, category }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
    methods.reset({ title: "", category_type: "" });
  };

  const onSubmit = (data) => {
    if (editMode) {
      dispatch(editCategory({ id: category.id, body: data }));
    } else {
      dispatch(createCategory(data));
    }
    handleClose();
  };

  const CategorySchema = Yup.object().shape({
    title: Yup.string().required("This field is required!"),
    category_type: Yup.string().required("This field is required!").oneOf(["expense", "income"], "Invalid data!"),
  });

  // * REACT HOOK FORM
  const methods = useForm({
    resolver: yupResolver(CategorySchema),
    defaultValues: {
      title: category.title || "",
      category_type: category.category_type || "",
    },
  });

  return (
    <>
      <FormProvider onSubmit={methods.handleSubmit(onSubmit)} methods={methods}>
        <Card>
          <CardHeader subheader="Add a new category" title="Category" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <RHFTextField name="title" label={"Title"} inputId="title-input" />
              </Grid>
              <Grid item md={6} xs={12}>
                <RHFSelect name="category_type" label={"Category Type"} inputId="category-input">
                  <MenuItem value="expense">Expense</MenuItem>
                  <MenuItem value="income">Income</MenuItem>
                </RHFSelect>
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

export default CategoryForm;
