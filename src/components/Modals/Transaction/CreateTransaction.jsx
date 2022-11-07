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
import { toast } from "react-toastify";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTransaction } from "../../../redux/features/transactionSlice";
import { fetchCategories, selectCategory } from "../../../redux/features/categorySlice";

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
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(dayjs(new Date()));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const clear = () => {
    handleClose();
    setAmount("");
    setCategory("");
    setNote("");
    setDate("");
  };

  const handleChange = (e) => {
    setDate(e.target.value);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createTransaction({ category, amount, note, date }));
    clear();
  };

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Box sx={style} component="form" onSubmit={handleCreate}>
          <Card>
            <CardHeader subheader="Add a new transaction" title="Transaction" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <InputLabel id="select">Category</InputLabel>
                  <Select
                    fullWidth
                    labelId="select"
                    id="category"
                    value={category}
                    required
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((c) => (
                      <MenuItem value={c.id} key={c.id}>
                        {c.title}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item md={6} xs={12} marginTop={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Date&Time picker"
                      value={date}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    type={"number"}
                    label="amount"
                    name="amount"
                    required
                    sx={{ textTransform: "capitalize" }}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Note"
                    name="Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    variant="outlined"
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
              <Button onClick={handleClose} color="error" size="small" variant="text">
                Cancel
              </Button>
              <Button type="submit" color="success" size="small" variant="text">
                Add
              </Button>
            </Box>
          </Card>
        </Box>
      </Modal>
    </>
  );
};

export default CreateTransaction;
