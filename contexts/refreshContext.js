import React from "react";
import { useState } from "react";

export const RefreshContext = React.createContext();

export default function RefreshProvider({ children }) {
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const value = {
    refresh,
    setRefresh,
    isLoading,
    setIsLoading
  };

  return (
    <RefreshContext.Provider value={value}>{children}</RefreshContext.Provider>
  );
}