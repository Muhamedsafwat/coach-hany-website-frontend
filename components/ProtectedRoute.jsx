import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Loading from "./Loading";
import { UserInfo } from "../authContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useContext(UserInfo);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const checkRole = () => {
    if (user.code) {
      return "user";
    } else if (user.username) {
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
    } else if (checkRole() == allowedRole) {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
