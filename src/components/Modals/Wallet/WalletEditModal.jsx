import React, { useEffect, useState } from "react";
import { Box, Modal, IconButton } from "@mui/material";
import { fetchWallets, selectWallet } from "../../../redux/features/walletSlice";
import { useDispatch, useSelector } from "react-redux";
import EditWallet from "../../Forms/Wallet/EditWallet";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const WalletEditModal = ({ title, id }) => {
  const dispatch = useDispatch();
  const wallets = useSelector(selectWallet);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!wallets.length) {
      dispatch(fetchWallets());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <EditOutlinedIcon color="success" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditWallet onClose={handleClose} title={title} id={id} />
        </Box>
      </Modal>
    </>
  );
};

export default WalletEditModal;
