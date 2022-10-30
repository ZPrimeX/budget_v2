import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, selectUser } from "../../src/redux/features/authSlice";

export const AuthContext = React.createContext({ auth: false });

const public_routes = ["/login", "/signup"];

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const current_route = router.pathname;
    if (!public_routes.includes(current_route)) {
      const token = localStorage.getItem("token");
      if (token && user.isAuth === false) {
        dispatch(fetchUserData());
      }
      if (!token) {
        router.push("/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <AuthContext.Provider value={user.isAuth}>{children}</AuthContext.Provider>;
};
