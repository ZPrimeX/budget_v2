import { InputLabel, Stack, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const RHFSelect = ({ name, inputId, label, children, ...others }) => {
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
              select
              id={inputId}
              error={error && isTouched}
              helperText={error?.message}
              {...others}
            >
              {children}
            </TextField>
          )}
        />
      </Stack>
    </>
  );
};

export default RHFSelect;
