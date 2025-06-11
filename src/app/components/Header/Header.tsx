"use client";

import styles from "./header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Search", href: "/search" },
];

const Header = () => {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    return `${styles.item} ${pathname === path && styles.isActive}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.itemsContainer}>
        {navigationItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <p className={getLinkClass(item.href)}>{item.name}</p>
          </Link>
        ))}
      </div>
      <div className={styles.itemsContainer}>
        <p className={styles.item}>Log out</p>
      </div>
    </div>
  );
};

export default Header;
