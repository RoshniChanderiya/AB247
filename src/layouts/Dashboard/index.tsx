import SubNav, { NavItemProps } from "@/components/SubNav";
import { AppRoutes } from "@/constants/AppRoutes";
import { useHeaderCount } from "@/hooks/analytics";
import Footer from "@/layouts/Dashboard/Footer";
import Header from "@/layouts/Dashboard/Header";
import get from "lodash/get";
import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import styles from "./styles.module.scss";

const DashboardLayout: React.FC = () => {
  const { data: analytics } = useHeaderCount();

  const navLinks: NavItemProps[] = useMemo(() => {
    return [
      { text: "Home", path: AppRoutes.HOME, count: 0 },
      {
        text: "Live Auctions",
        path: AppRoutes.LIVE_AUCTIONS,
        count: Number(get(analytics, "auctions.live", 0)),
      },
      {
        text: "Scheduled Auctions",
        path: AppRoutes.SCHEDULED_AUCTIONS,
        count: Number(get(analytics, "auctions.scheduled", 0)),
      },
      {
        text: "New Deals",
        path: AppRoutes.NEW_DEALS,
        count: Number(get(analytics, "deals.new", 0)),
      },
      {
        text: "Pending Deals",
        path: AppRoutes.PENDING_DEALS,
        count: Number(get(analytics, "deals.pending", 0)),
      },
      {
        text: "Funded Deals",
        path: AppRoutes.FUNDED_DEALS,
        count: Number(get(analytics, "deals.funded", 0)),
      },
      { text: "Inventory", path: AppRoutes.INVENTORY, count: 0 },
      { text: "Lost Auctions", path: AppRoutes.LOST_AUCTIONS, count: 0 },
      { text: "Wholesale", path: AppRoutes.WHOLESALE, count: 0 },
    ];
  }, [analytics]);

  return (
    <>
      <Header />
      <SubNav navLinks={navLinks} title="Dealers Dashboard" />

      <div className={styles.main}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
