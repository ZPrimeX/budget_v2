import React from 'react'

const WalletForm = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    methods.reset({ title: "", balance: 0 });
  };
  
  return (
    <></>
  )
}

export default WalletForm
