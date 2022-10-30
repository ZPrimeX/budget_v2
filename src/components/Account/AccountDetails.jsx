import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateProfile } from "../../redux/features/authSlice";

const AccountDetails = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const [isTouched, setIsTouched] = useState(false);
  const [first_name, setFirstName] = useState(user.first_name);
  const [last_name, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);

  useEffect(() => {
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.isAuth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ first_name, last_name, email }));
  };

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
    if (user.first_name !== e.target.value) {
      setIsTouched(true);
    } else {
      setIsTouched(false);
    }
  };
    
  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
    if (user.last_name !== e.target.value) {
      setIsTouched(true);
    } else {
      setIsTouched(false);
    }
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    if (user.email !== e.target.value) {
      setIsTouched(true);
    } else {
      setIsTouched(false);
    }
  };

  return (
    <>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
                  sx={{ textTransform: "capitalize" }}
                  value={first_name}
                  onChange={handleChangeFirstName}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  required
                  value={last_name}
                  onChange={handleChangeLastName}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  required
                  value={email}
                  onChange={handleChangeEmail}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField fullWidth label="Country" name="country" value={user.country} variant="outlined" />
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
            <Button color="primary" variant="contained" type="submit" disabled={!isTouched}>
              Save details
            </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};

export default AccountDetails;
