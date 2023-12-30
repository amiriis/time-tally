import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLocalDb, setLocalDb] = useState(false);
  return (
    <AppContext.Provider value={{ isLocalDb, setLocalDb }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};
