import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, selectUser } from "../../redux/features/authSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";

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
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: "100vh",
              background: "#101010",
            }}
          >
            <Navbar />
            {children}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Layout;
