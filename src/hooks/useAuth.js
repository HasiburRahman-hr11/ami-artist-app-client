import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const getToken = localStorage.getItem("ami-am-token");
  let userData = {};
  if (getToken) {
    const decodedToken = jwtDecode(getToken);
    userData = decodedToken;
  }

  const [user, setUser] = useState(userData);

  const handleLogout = () => {
    localStorage.removeItem("ami-am-token");
    setUser({});
  };

  return {
    user,
    setUser,
    handleLogout,
  };
};

export default useAuth;
