import React from "react";
import { InputLabel, Stack, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import NumberFormat from "react-number-format";

const RHFNumber = ({ name, inputId, label, ...others }) => {
  const { control } = useFormContext();

  return (
    <>
      <Stack>
        <InputLabel id={inputId}>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error, isTouched } }) => (
            // <NumberFormat
            //   {...field}
            //   id={inputId}
            //   error={error && isTouched}
            //   helperText={error?.message}
            //   thousandSeparator
            //   isNumericString
            //   prefix="$"
            //   {...others}
            // />
            <TextField
              {...field}
              id={inputId}
              error={error && isTouched}
              helperText={error?.message}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*", prefix: "$" }}
              {...others}
            />
          )}
        />
      </Stack>
    </>
  );
};

export default RHFNumber;
