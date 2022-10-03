import React from "react";
import { Box, Typography } from "@mui/material";
import SingleWallet from "../components/Cards/SingleWallet/SingleWallet";
import WalletCreateModal from "../components/Modals/WalletCreateModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchWallets, selectWallet } from "../core/redux/features/walletSlice";
import { useEffect } from "react";

const WalletContainer = () => {
  const wallets = useSelector(selectWallet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWallets());
  }, []);

  return (
    <>
      <Box padding={15}>
        <Box>
          <WalletCreateModal />
        </Box>
        <Box height={"100px"} width={"700px"} backgroundColor={"#171717"}>
          <Box backgroundColor={"#222222"}>
            <Typography>Included in Total</Typography>
          </Box>
          <Box padding={2}>
            {wallets.map((i) => (
              <SingleWallet
                key={i.id}
                title={i.title}
                balance={i.balance}
                img={i.img}
              />
            ))}
          </Box>
        </Box>
        <Box
          height={"100px"}
          width={"700px"}
          backgroundColor={"#171717"}
          marginTop={5}
        >
          <Box backgroundColor={"#222222"}>
            <Typography>Excluded from Total</Typography>
          </Box>
          <Box padding={2}></Box>
        </Box>
      </Box>
    </>
  );
};

export default WalletContainer;
