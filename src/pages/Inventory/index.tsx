import { InventoryState } from "@/types/vehicle";
import split from "lodash/split";
import React, { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import InventoryHeader from "./InventoryHeader";

export const InventoryContext = React.createContext<{
  state: InventoryState;
}>({ state: "active" });

const Inventory: React.FC = () => {
  const { pathname } = useLocation();

  const state: InventoryState = useMemo(() => {
    const stateFromURL = split(pathname, "/")[2] || "active";
    if (stateFromURL === "removed") {
      return "inactive";
    }

    return stateFromURL as InventoryState;
  }, [pathname]);

  return (
    <InventoryContext.Provider value={{ state }}>
      <InventoryHeader />
      <Outlet />
    </InventoryContext.Provider>
  );
};

export default Inventory;
