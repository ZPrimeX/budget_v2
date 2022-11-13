import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Box, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {  fetchCategories, selectCategory } from "../../../redux/features/categorySlice";
import CategoryForm from "../../Forms/Category/CategoryForm";

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

const CategoryModal = ({buttonText, editMode=false, categoryProps}) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategory);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Button onClick={handleOpen} color="primary" endIcon={<AddCircleOutlineIcon />} size="small" variant="text">
        {buttonText}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CategoryForm onClose={handleClose} editMode={editMode} category={categoryProps}/>
        </Box>
      </Modal>
    </>
  );
};

export default CategoryModal;
