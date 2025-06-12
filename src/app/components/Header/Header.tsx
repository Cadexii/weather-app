"use client";

import styles from "./header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../Contexts/AuthProvider";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Search", href: "/search" },
];

const Header = () => {
  const pathname = usePathname();
  const { user, loading, logOut } = useAuth();

  const getLinkClass = (path: string) => {
    return `${styles.item} ${pathname === path && styles.isActive}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.itemsContainer}>
        {user &&
          !loading &&
          navigationItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <p className={getLinkClass(item.href)}>{item.name}</p>
            </Link>
          ))}
      </div>
      {user && !loading ? (
        <div className={styles.itemsContainer}>
          <p className={styles.item} onClick={logOut}>
            Log out
          </p>
        </div>
      ) : (
        <p className={styles.titleItem}>Weather App</p>
      )}
    </div>
  );
};

export default Header;
