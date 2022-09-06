import { AppRoutes } from "@/constants/AppRoutes";
import { useHeaderCount } from "@/hooks/analytics";
import useAuth from "@/hooks/useAuth";
import Footer from "@/layouts/Dashboard/Footer";
import Header from "@/layouts/Dashboard/Header";
import get from "lodash/get";
import trim from "lodash/trim";
import React, { useEffect, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import SubHeader, { NavItemProps } from "./SubHeader";

const DashboardLayout: React.FC = () => {
  const { isLoggedIn } = useAuth();
  
  const { data: analytics } = useHeaderCount({
    enabled: isLoggedIn
  });
  const location = useLocation();
  const navigate = useNavigate();
  const isOnboarding = trim(location.pathname, "/") === "onboarding";

  useEffect(() => {
    if (isOnboarding) {
      return;
    }
    if (!isLoggedIn) {
      navigate(AppRoutes.LOGIN);
    }
  }, [isOnboarding, isLoggedIn, navigate]);

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
    ];
  }, [analytics]);

  return (
    <>
      <Header />
      {!isOnboarding && (
        <SubHeader navLinks={navLinks} title="Dealers Dashboard" />
      )}
      <div className={styles.main}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
