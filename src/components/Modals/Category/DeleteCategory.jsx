import React from "react";
import { IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteCategory } from "../../../redux/features/categorySlice";
import { useDispatch } from "react-redux";

const DeleteCategory = ({ category }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    dispatch(deleteCategory(category.id));
  };

  return (
    <>
      <IconButton edge="end" size="small" onClick={handleDelete}>
        <DeleteOutlineOutlinedIcon color="error" />
      </IconButton>
    </>
  );
};

export default DeleteCategory;
