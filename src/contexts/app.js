"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isLocalDb, setLocalDb] = useState(false);

    return <AppContext.Provider value={{ isLocalDb, setLocalDb }}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    return useContext(AppContext);
};
