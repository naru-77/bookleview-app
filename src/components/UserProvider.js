import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(
    () => localStorage.getItem("username") || ""
  );

  useEffect(() => {
    if (username) {
      // usernameがtruthyな値の場合のみlocalStorageに保存
      localStorage.setItem("username", username);
    }
  }, [username]);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
