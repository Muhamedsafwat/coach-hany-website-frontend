import { createContext, useEffect, useState } from "react";

export const UserInfo = createContext(null);

function Context({ children }) {
  //get token saved in localStorage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  //set the new token in localStorage
  const setToken = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
  };

  //user state for context
  const [user, setUser] = useState("");

  //login function to set user in context and localStorage
  const login = (user) => {
    setUser(user);
    setToken(user);
  };

  //logout function to clear localStorage and context
  const logout = () => {
    setUser("");
    setToken("");
  };
  //check if user was logged in
  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser(JSON.parse(token));
    }
  }, []);

  return (
    <UserInfo.Provider value={{ user, login, logout }}>
      {children}
    </UserInfo.Provider>
  );
}

export default Context;
