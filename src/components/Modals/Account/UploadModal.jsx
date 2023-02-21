import React from "react";
import { Avatar, Box, Button, Grid, Modal, Stack, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import axios from "axios";

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

const UploadModal = ({ open, handleClose, handleFileSubmit }) => {
  const [file, setFile] = useState();

  const onDrop = (files) => {
    setFile(files[0]);
  };

  const uploadFile = async (file) => {
    const formdata = new FormData();
    formdata.append("file", file);
    const res = await axios.post("/api/upload", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  };

  const handleSubmit = async () => {
    const { data } = await uploadFile(file);
    const url = `${process.env.NEXT_PUBLIC_DO_CDN}/${data.body}`;
    handleFileSubmit(url);
    handleClose();
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    maxFiles: 1,
  });

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Upload File</Typography>
            </Grid>

            <Grid item xs={12}>
              <Avatar
                src={file ? URL.createObjectURL(file) : ""}
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "5px",
                  minHeight: "200px",
                }}
              >
                File
              </Avatar>
            </Grid>
            <Stack flexDirection={"row"} justifyContent={"space-between"} width={"100%"} marginTop={2}>
              <Box {...getRootProps({})} marginLeft={2}>
                <input {...getInputProps()} />
                <Button variant="outlined" color="primary">
                  Edit
                </Button>
              </Box>
              <Button variant="contained" onClick={handleSubmit} color="success">
                Submit
              </Button>
            </Stack>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default UploadModal;
