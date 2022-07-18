import React from "react";
import { useState } from "react";

export const RefreshContext = React.createContext();

export default function RefreshProvider({ children }) {
  const [refresh, setRefresh] = useState(false);

  const value = {
    refresh,
    setRefresh
  };

  return (
    <RefreshContext.Provider value={value}>{children}</RefreshContext.Provider>
  );
}