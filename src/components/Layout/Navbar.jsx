import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SingleWallet from "../Cards/SingleWallet/SingleWallet";
import { Box, Button } from "@mui/material";
import TransactionModal from "../Modals/TransactionModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../core/redux/features/authSlice";
import {
  fetchWallets,
  selectWallet,
} from "../../core/redux/features/walletSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const wallets = useSelector(selectWallet);
  useEffect(() => {
    dispatch(fetchWallets());
  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box
              display={"flex"}
              height={"100%"}
              width={"100%"}
              justifyContent="space-between"
            >
              {wallets.map((i) => (
                <SingleWallet
                  key={i.id}
                  title={i.title}
                  balance={i.balance}
                  img={i.img}
                />
              ))}
              <Box
                alignItems={"center"}
                display="flex"
                width={"800px"}
                justifyContent="space-between"
              >
                <TransactionModal />
                <Button
                  variant="outlined"
                  sx={{ color: "colors.red" }}
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </Button>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
