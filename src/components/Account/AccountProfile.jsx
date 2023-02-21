import React, { useState } from "react";
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material";
import { selectUser, updateProfile } from "../../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import UploadModal from "../Modals/Account/UploadModal";

const AccountProfile = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleAvatarUpdate = (url) => {
    dispatch(updateProfile({ avatar: url }));
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Card {...props}>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={user.avatar}
              sx={{
                height: 64,
                mb: 2,
                width: 64,
              }}
            />
            <Box display={"flex"} gap={1}>
              <Typography color="textPrimary" gutterBottom variant="h5" textTransform={"capitalize"}>
                {user.first_name}
              </Typography>
              <Typography color="textPrimary" gutterBottom variant="h5" textTransform={"capitalize"}>
                {user.last_name}
              </Typography>
            </Box>
            <Box display={"flex"} gap={1}>
              <Typography color="textPrimary" variant="body2">
                Joined on:
              </Typography>
              <Typography color="primary" variant="body2">
                {`${dayjs(user.createdAt || 0)}`}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" fullWidth variant="text" onClick={handleOpen}>
            Upload picture
          </Button>
        </CardActions>
        <UploadModal open={open} handleClose={handleClose} handleFileSubmit={handleAvatarUpdate} />
        <Divider />
      </Card>
    </>
  );
};

export default AccountProfile;
