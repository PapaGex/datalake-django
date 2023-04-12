import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { logoutUser } from "../redux/reducers/auth/authActions";

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = useCallback(() => {
    dispatch(logoutUser(router));
  }, [dispatch, router]);

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  // Don't render the component
  return null; 
};

export default Logout;