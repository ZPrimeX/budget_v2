import React from "react";
import { IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../../redux/features/transactionSlice";

const DeleteTransaction = ({ id }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteTransaction(id));
  };

  return (
    <>
      <IconButton edge="end" size="small" onClick={handleDelete}>
        <DeleteOutlineOutlinedIcon color="error" />
      </IconButton>
    </>
  );
};

export default DeleteTransaction;
