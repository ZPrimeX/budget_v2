import PropTypes from "prop-types";
import { Box, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";

export const AccountPopover = (props) => {
  const { first_name, last_name, anchorEl, onClose, open, ...other } = props;
  const dispatch = useDispatch();

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: "300px" },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
          cursor: "pointer",
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Box display={"flex"} gap={0.2}>
          <Typography color="text.secondary" variant="body2">
            {first_name}.
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {last_name}
          </Typography>
        </Box>
      </Box>
      <MenuList
        disablePadding
        sx={{
          "& > *": {
            "&:first-of-type": {
              borderTopColor: "divider",
              borderTopStyle: "solid",
              borderTopWidth: "1px",
            },
            padding: "12px 16px",
          },
        }}
      >
        <MenuItem onClick={() => dispatch(logout())}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
