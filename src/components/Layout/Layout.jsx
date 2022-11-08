import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/authSlice";

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
  return (
    <>
      {user.status !== "fulfilled" ? (
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
