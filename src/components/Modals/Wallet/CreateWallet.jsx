import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Box, Modal } from "@mui/material";
import { fetchWallets, selectWallet } from "../../../redux/features/walletSlice";
import { useDispatch, useSelector } from "react-redux";
import WalletForm from "../../Forms/Wallet/WalletForm";

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

const WalletModal = ({ buttonText, editMode = false, walletProps }) => {
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
      <Button onClick={handleOpen} color="primary" endIcon={<AddCircleOutlineIcon />} size="small" variant="text">
        {buttonText}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <WalletForm onClose={handleClose} editMode={editMode} wallet={walletProps} />
        </Box>
      </Modal>
    </>
  );
};

export default WalletModal;
