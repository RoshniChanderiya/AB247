import Icon, { IconArrowLeft } from "@/assets/images";
import classNames from "classnames";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav } from "reactstrap";
import Link from "@/components/Link";
import styles from "./styles.module.scss";

export interface NavItemProps {
  path: string;
  text: string;
  count: number;
}

interface LeftButtonProps {
  link: string;
  text: string;
}

interface SubNavProps {
  navLinks: NavItemProps[];
  title: string;
  leftButton?: LeftButtonProps;
}

const SubHeader: React.FC<SubNavProps> = ({ navLinks, title, leftButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.subHeader}>
      <div className={styles.subNav}>
        <Navbar color="dark" dark expand="lg">
          <Link to="/" className={classNames(styles.brand, "d-lg-none")}>
            {title}
          </Link>
          <NavbarToggler className={styles.navbarToggler} onClick={toggle} />
          <Collapse
            className="d-lg-flex justify-content-center align-items-lg-center"
            isOpen={isOpen}
            navbar
          >
            <Nav navbar>
              {leftButton && (
                <NavLink to={leftButton.link} className={styles.leftNavButton}>
                  <Icon icon={IconArrowLeft} alt="left arrow" />
                  {leftButton.text}
                </NavLink>
              )}
              <ul className="px-0 d-lg-flex">
                {navLinks.map((item) => (
                  <li key={item.path} className={styles.linkItem}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        classNames(styles.navLink, {
                          [styles.active]: isActive,
                        })
                      }
                    >
                      <div className={styles.badgeBlock}>
                        {item.text}
                        {item.count > 0 && (
                          <span className={styles.badge}>{item.count}</span>
                        )}
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </div>
  );
};
export default SubHeader;
