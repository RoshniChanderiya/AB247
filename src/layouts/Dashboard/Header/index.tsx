import Icon, { IconMenu, ChevronDown } from "@/assets/images";
import Logo from "@/assets/images/logos";
import { AppRoutes } from "@/constants";
import useAuth from "@/hooks/useAuth";
import { getInitials } from "@/utils/generic";
import classNames from "classnames";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  Popover,
} from "reactstrap";
import ProfileOptions from "./ProfileOptions";
import styles from "./styles.module.scss";

const Header: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const onHover = () => setIsDropdownOpen(true);
  const onHoverLeave = () => setIsDropdownOpen(false);

  return (
    <Navbar className={styles.navbar} light expand="lg">
      <NavLink to={AppRoutes.HOME}>
        <Logo alt="Header Logo" variant="header" />
      </NavLink>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className={styles.linksContainer} navbar>
          <NavItem>
            <NavLink to={AppRoutes.HOME} className={styles.navItem}>
              <span>Sell </span>
              <ChevronDown />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={AppRoutes.HOME} className={styles.navItem}>
              <span> Buy </span>
              <ChevronDown />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={AppRoutes.HOME} className={styles.navItem}>
              <span>Dealer </span>
              <ChevronDown />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={AppRoutes.HOME} className={styles.contact}>
              <span>Contact </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <div className={styles.profileContainer}>
              <div
                onMouseLeave={onHoverLeave}
                onMouseOver={onHover}
                id="Popover2"
              >
                <div className={styles.profile}>MA</div>
                <Popover
                  placement="bottom"
                  className={classNames(
                    styles.dropdownMenuProfile,
                    "d-lg-none"
                  )}
                  isOpen={isDropdownOpen}
                  target="Popover2"
                  trigger="focus"
                >
                  <ProfileOptions />
                </Popover>
              </div>
              <Icon icon={IconMenu} alt="menu icon" />
            </div>
          </NavItem>
        </Nav>
      </Collapse>
      <div className={styles.profileContainer}>
        <div onMouseLeave={onHoverLeave} onMouseOver={onHover} id="Popover1">
          <div className={styles.profile}>{getInitials(user?.name)}</div>
          <Popover
            placement="bottom"
            className={classNames(
              styles.dropdownMenuProfile,
              "d-none",
              "d-lg-block"
            )}
            isOpen={isDropdownOpen}
            target="Popover1"
            trigger="focus"
          >
            <ProfileOptions />
          </Popover>
        </div>
        <Icon icon={IconMenu} alt="menu icon" />
      </div>
    </Navbar>
  );
};

export default Header;
