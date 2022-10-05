import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, selectUser } from "../../redux/features/authSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";

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
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && user.isAuth === false) {
      dispatch(fetchUserData());
    }
    if (!token) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
