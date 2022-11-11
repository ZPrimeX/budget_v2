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
            {/*TODO: Change the type to date and add an account creation date <Typography color="textSecondary" variant="body2">
              {`${user.createdAt}`}
            </Typography> */}
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" fullWidth variant="text">
            Upload picture
          </Button>
        </CardActions>
        <Divider />
        {/* TODO: Fix the error with google image search
        <Box>
          <script async src="https://cse.google.com/cse.js?cx=d3eb9331f8d4b46d5"></script>
          <div class="gcse-search"></div>
        </Box> */}
      </Card>
    </>
  );
};

export default AccountProfile;
