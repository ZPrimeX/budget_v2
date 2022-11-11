import React from "react";
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material";
import { selectUser } from "../../redux/features/authSlice";
import { useSelector } from "react-redux";

const AccountProfile = (props) => {
  const user = useSelector(selectUser);

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
            <Typography color="textSecondary" variant="body2">
              {`${user.createdAt}`}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" fullWidth variant="text">
            Upload picture
          </Button>
        </CardActions>
        <Divider />
      </Card>
    </>
  );
};

export default AccountProfile;
