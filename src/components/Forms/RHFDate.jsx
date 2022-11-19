import React from "react";
import { InputLabel, Stack, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const RHFDate = ({ name, inputId, label, ...others }) => {
  const { control } = useFormContext();

  return (
    <>
      <Stack>
        <InputLabel id={inputId}>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error, isTouched } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                {...field}
                id={inputId}
                error={error && isTouched}
                helperText={error?.message}
                renderInput={(params) => <TextField {...params} fullWidth />}
                {...others}
              />
            </LocalizationProvider>
          )}
        />
      </Stack>
    </>
  );
};

export default RHFDate;
