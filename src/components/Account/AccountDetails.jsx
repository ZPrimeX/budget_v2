import React from "react";
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/authSlice";

const AccountDetails = () => {
  const user = useSelector(selectUser);
  return (
    <>
      <form autoComplete="off" noValidate>
        <Card>
          <CardHeader subheader="The information can be edited" title="Profile" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="First name"
                  name="firstName"
                  required
                  value={user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  required
                  value={user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1)}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  required
                  value={user.email}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField fullWidth label="Country" name="country" required value={user.country} variant="outlined" />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button color="primary" variant="contained">
              Save details
            </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};

export default AccountDetails;
