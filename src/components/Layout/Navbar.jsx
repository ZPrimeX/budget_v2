import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountPopover } from "./AccountPopover";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/authSlice";
import PersonIcon from "@mui/icons-material/Person";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ColorModeContext } from "../../pages/_app";

const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#0D0D0D" : "#F3F4F6",
  boxShadow: theme.shadows[3],
}));

const Navbar = () => {
  const user = useSelector(selectUser);

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);

  return (
    <>
      <NavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          {/* TODO: In case I need a search icon or any other icons*/}
          {/* <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip> */}
          <Box sx={{ flexGrow: 1 }} />
          {/* <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              <UsersIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip> */}
          <Box>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? <LightModeIcon /> : <Brightness3Icon />}
            </IconButton>
          </Box>
          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: "pointer",
              height: 40,
              width: 40,
              ml: 1,
            }}
            src={user.avatar}
          >
            <PersonIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </NavbarRoot>
      <AccountPopover
        {...user}
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );
};

Navbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};

export default Navbar;
