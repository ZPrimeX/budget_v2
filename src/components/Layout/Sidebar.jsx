import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, useMediaQuery } from "@mui/material";
import { ChartBar as ChartBarIcon } from "../../icons/chart-bar";
import { Cog as CogIcon } from "../../icons/cog";
import { User as UserIcon } from "../../icons/user";
import { NavItem } from "./nav-item";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";

const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/account",
    icon: <UserIcon fontSize="small" />,
    title: "Account",
  },
  {
    href: "/transactions",
    icon: <CurrencyExchangeOutlinedIcon fontSize="small" />,
    title: "Transactions",
  },
  {
    href: "/categories",
    icon: <CategoryOutlinedIcon fontSize="small" />,
    title: "Categories",
  },
  {
    href: "/wallets",
    icon: <WalletOutlinedIcon fontSize="small" />,
    title: "Wallets",
  },
  {
    href: "/settings",
    icon: <CogIcon fontSize="small" />,
    title: "Settings",
  },
];

const Sidebar = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });
  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <a>
              {/* <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                /> */}
            </a>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 2,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default Sidebar;
