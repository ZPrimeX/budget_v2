import React from "react";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "@mui/material";
import NextLink from "next/link";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PersonIcon from "@mui/icons-material/Person";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LayersIcon from "@mui/icons-material/Layers";

const drawerWidth = 200;

const Sidebar = () => {
  return (
    <>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <Link component={NextLink} href="/account" underline="none">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={"Account"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link component={NextLink} href="/wallets" underline="none">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CreditCardIcon />
                </ListItemIcon>
                <ListItemText primary={"Wallets"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link component={NextLink} href="/categories" underline="none">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary={"Categories"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link component={NextLink} href="/" underline="none">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CurrencyExchangeIcon />
                </ListItemIcon>
                <ListItemText primary={"Transactions"} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link component={NextLink} href="/report" underline="none">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AssessmentIcon />
                </ListItemIcon>
                <ListItemText primary={"Report"} />
              </ListItemButton>
            </ListItem>
          </Link>
          {/* <Link component={NextLink} href="/" underline="none">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBalanceIcon />
                </ListItemIcon>
                <ListItemText primary={"Budget"} />
              </ListItemButton>
            </ListItem>
          </Link> */}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
