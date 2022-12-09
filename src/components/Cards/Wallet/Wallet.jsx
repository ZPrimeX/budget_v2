import React from "react";
import { Avatar, Card, CardContent, Grid, Typography, Box, IconButton } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useSelector } from "react-redux";
import { selectWallet } from "../../../redux/features/walletSlice";
import WalletEditModal from "../../Modals/Wallet/WalletEditModal";
import DeleteWalletModal from "../../Modals/Wallet/DeleteWalletModal";

const Wallet = () => {
  const wallets = useSelector(selectWallet);

  return (
    <>
      <Grid container spacing={3}>
        {wallets.map((w) => (
          <Grid item lg={5} md={6} xl={2} xs={12} key={w.id}>
            <Card>
              <CardContent>
                <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
                  <Grid item>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                      {w.title}
                    </Typography>
                    <Typography color="textPrimary" variant="h4">
                      ${w.balance}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      sx={{
                        backgroundColor: "primary.main",
                        height: 60,
                        width: 60,
                      }}
                    >
                      <AttachMoneyIcon />
                    </Avatar>
                  </Grid>
                </Grid>
                {/* <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    pt: 2,
                  }}
                >
                  <ArrowUpwardIcon color="success" />
                  <Typography
                    variant="body2"
                    sx={{
                      mr: 1,
                    }}
                  >
                    15%
                  </Typography>
                  {/* <Typography color="textSecondary" variant="caption">
                    Since last month
                  </Typography> */}
                {/* </Box> */}
                <Box sx={{ alignItems: "center", display: "flex", pt: 2, justifyContent: "end" }}>
                  <WalletEditModal title={w.title} id={w.id} />
                  <DeleteWalletModal id={w.id} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Wallet;
