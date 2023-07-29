import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import Loading from "./Loading";
import { UserInfo } from "../authContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useContext(UserInfo);
  const router = useRouter();

  const checkRole = () => {
    if (user.code) {
      return "user";
    } else if (user.userName) {
      return "admin";
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (checkRole() != allowedRole && allowedRole == "user") {
      router.push("/login");
    } else if (checkRole() != allowedRole && allowedRole == "admin") {
      router.push("/admin/login");
    }
  }, []);

  if (checkRole() != allowedRole) {
    return <Loading />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
