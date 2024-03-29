import React from "react";
import { InputLabel, Stack, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const RHFTextField = ({ name, inputId, label, ...others }) => {
  const { control } = useFormContext();

  return (
    <>
      <Stack>
        <InputLabel id={inputId}>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error, isTouched } }) => (
            <TextField
              {...field}
              fullWidth
              id={inputId}
              error={error && isTouched}
              helperText={error?.message}
              sx={{ textTransform: "capitalize" }}
              variant="outlined"
              {...others}
            />
          )}
        />
      </Stack>
    </>
  );
};

export default RHFTextField;
