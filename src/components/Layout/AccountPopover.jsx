import PropTypes from "prop-types";
import { Box, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import NextLink from "next/link";
import { GoogleLogout } from "@leecheuk/react-google-login";
import { GOOGLE_CLOUD_ID } from "../../utils/lib";
import { useEffect } from "react";

export const AccountPopover = (props) => {
  const { first_name, last_name, anchorEl, onClose, open, ...other } = props;
  const dispatch = useDispatch();

  const initGapi = async () => {
    const gapi = await import("gapi-script").then((pack) => pack.gapi);

    const initClient = () => {
      gapi.client.init({
        clientId: GOOGLE_CLOUD_ID,
      });
    };
    gapi.load("client:auth2", initClient);
  };

  useEffect(() => {
    initGapi();
  }, []);

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
      <NextLink href={"/account"}>
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
              {first_name.charAt(0).toUpperCase() + first_name.slice(1)}.
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {last_name.charAt(0).toUpperCase()}
            </Typography>
          </Box>
        </Box>
      </NextLink>
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
        {other.google_id ? (
          <GoogleLogout buttonText="Logout" clientId={GOOGLE_CLOUD_ID} onLogoutSuccess={() => dispatch(logout())} />
        ) : (
          <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
        )}
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
