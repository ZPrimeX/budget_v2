import React from "react";
import {
  TextField,
  Modal,
  Button,
  Box,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "22%",
  left: "60%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TransactionModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(dayjs());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [wallet, setWallet] = React.useState("Wallet 1");

  const handleChangeWallet = (event) => {
    setWallet(event.target.value);
  };

  const wallets = [
    {
      value: "Wallet1",
      label: "Wallet 1",
    },
    {
      value: "Wallet2",
      label: "Wallet 2",
    },
    {
      value: "Wallet3",
      label: "Wallet 3",
    },
    {
      value: "Wallet4",
      label: "Wallet 4",
    },
    {
      value: "Wallet5",
      label: "Wallet 5",
    },
  ];

  const [category, setCategory] = React.useState("Category 1");

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const categories = [
    {
      value: "Category1",
      label: "Category 1",
    },
    {
      value: "Category2",
      label: "Category 2",
    },
    {
      value: "Category3",
      label: "Category 3",
    },
  ];

  return (
    <>
      <Button
        variant="outlined"
        sx={{ color: "colors.lime" }}
        onClick={handleOpen}
      >
        Add Transaction
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box component={"form"}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  id="outlined-select-wallet"
                  select
                  label="Wallet"
                  value={wallet}
                  onChange={handleChangeWallet}
                  fullWidth
                >
                  {wallets.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-select-wallet"
                  select
                  label="Category"
                  value={category}
                  onChange={handleChangeCategory}
                  fullWidth
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Date"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TransactionModal;
