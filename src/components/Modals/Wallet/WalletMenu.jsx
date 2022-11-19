import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeWallet, selectCurrentWallet, selectWallet } from "../../../redux/features/walletSlice";

const WalletMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const wallets = useSelector(selectWallet);
  const currentWallet = useSelector(selectCurrentWallet);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeWallet = (id) => {
    dispatch(changeWallet(id));
    handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
        endIcon={open ? <ArrowUpward /> : <ArrowDownward />}
      >
        {currentWallet?.title}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {wallets.map((w) => (
          <MenuItem key={w.id} onClick={() => handleChangeWallet(w.id)}>
            {w.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default WalletMenu;
