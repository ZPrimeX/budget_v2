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
import { createCategory, fetchCategories, selectCategory } from "../../../redux/features/categorySlice";
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

const CategoryModal = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategory);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const clear = () => {
    handleClose();
    setTitle("");
    setType("");
    setNote("");
  };

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createCategory({ title, note, category_type: type }));
    clear();
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
      title: "",
      note: "",
      type: "",
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
            <CardHeader subheader="Add a new category" title="Category" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Controller
                    name="title"
                    control={methods.control}
                    rules={{ required: true }}
                    render={({ field, fieldState: { error, isTouched } }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Title"
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
                  <Controller
                    name="note"
                    control={methods.control}
                    rules={{ required: false }}
                    render={({ field, fieldState: { error, isTouched } }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Note"
                        name="Note"
                        helperText={error?.message}
                        error={error && isTouched}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputLabel id="select">Type</InputLabel>
                  <Select
                    fullWidth
                    labelId="select"
                    id="categoryType"
                    value={type}
                    required
                    onChange={(e) => setType(e.target.value)}
                  >
                    <MenuItem value="expense">Expense</MenuItem>
                    <MenuItem value="income">Income</MenuItem>
                  </Select>
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

export default CategoryModal;
