import React from "react";
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
        <Box sx={style} component="form">
          <Card>
            <CardHeader subheader="Add a new category" title="Category" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    required
                    sx={{ textTransform: "capitalize" }}
                    // value={first_name}
                    // onChange={handleChangeFirstName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Note"
                    name="Note"
                    required
                    // value={last_name}
                    // onChange={handleChangeLastName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <InputLabel id="select">Type</InputLabel>
                  <Select
                    fullWidth
                    labelId="select"
                    id="categoryType"
                    // value={type}
                    required
                    // onChange={handleChange}
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
              <Button onClick={handleClose} color="error" size="small" variant="text">
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
