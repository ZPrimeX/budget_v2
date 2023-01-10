import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/features/authSlice";
import { fetchCategories, selectCategory } from "../../redux/features/categorySlice";
import { fetchWallets } from "../../redux/features/walletSlice";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

const Layout = ({ children }) => {
  const user = useSelector(selectUser);
  const categories = useSelector(selectCategory);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
    dispatch(fetchWallets());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!user.isAuth ? (
        <Box width={"100%"} height="100vh"></Box>
      ) : (
        <>
          <DashboardLayoutRoot>
            <Box
              sx={{
                display: "flex",
                flex: "1 1 auto",
                flexDirection: "column",
                width: "100%",
              }}
            >
              {children}
            </Box>
          </DashboardLayoutRoot>
          <Sidebar />
          <Navbar />
        </>
      )}
    </>
  );
};

export default Layout;
