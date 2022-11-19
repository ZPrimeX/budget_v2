import { Button, Menu, MenuItem } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { selectCurrentWallet, selectWallet } from "../../../redux/features/walletSlice";

const WalletMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const wallets = useSelector(selectWallet);
  const currentWallet = useSelector(selectCurrentWallet);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
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
          <MenuItem key={w.id} onClick={handleClose}>
            {w.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default WalletMenu;
