import Link from "@/components/Link";
import { AppRoutes } from "@/constants";
import { useHeaderCount } from "@/hooks/analytics";
import useAuth from "@/hooks/useAuth";
import React from "react";
import styles from "./../styles.module.scss";

const Sidebar: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { data = { auctions: {}, deals: {} } } = useHeaderCount({
    enabled: isLoggedIn,
  });
  return (
    <div className={styles.container}>
      <div className={styles.tittle}>
        <h5>Notifications</h5>
      </div>
      <Link to={AppRoutes.LIVE_AUCTIONS} variant="default">
        <div className={styles.navLinks}>
          <span className={styles.badge}>{data.auctions.live || 0}</span>
          <h5>Live Auctions</h5>
        </div>
      </Link>
      <Link to={AppRoutes.SCHEDULED_AUCTIONS} variant="default">
        <div className={styles.navLinks}>
          <span className={styles.badge}>{data.auctions.scheduled || 0}</span>
          <h5>Scheduled Auctions</h5>
        </div>
      </Link>
      <Link to={AppRoutes.NEW_DEALS} variant="default">
        <div className={styles.navLinks}>
          <span className={styles.badge}>{data.deals.new || 0}</span>
          <h5>New Deals</h5>
        </div>
      </Link>
      <Link to={AppRoutes.PENDING_DEALS} variant="default">
        <div className={styles.navLinks}>
          <span className={styles.badge}>{data.deals.pending || 0}</span>
          <h5>Pending Deals</h5>
        </div>
      </Link>
      <Link to={AppRoutes.FUNDED_DEALS} variant="default">
        <div className={styles.navLinks}>
          <span className={styles.badge}>{data.deals.funded || 0}</span>
          <h5>Funded Deals</h5>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
