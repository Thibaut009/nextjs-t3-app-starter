import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "~/components/navbar/styles.module.css";
import { HiHome, HiUsers, HiNewspaper } from 'react-icons/hi';
import { BiSolidMessageRoundedDetail } from 'react-icons/bi';

export default function Navbar() {
  const { status } = useSession();

  return (
    <nav className={styles.bottomNavbar}>
      <div className={styles.navbar_menu}>
        <ul className={styles.navbar_links}>
          <li>
            <Link className={styles.navbar_link} href="/">
              <HiHome className={styles.navbar_icon}/> 
              <label className={styles.navbar_text}>Home</label>
            </Link>
          </li>
          {status === "authenticated" && (
            <>
              <li>
                <Link className={styles.navbar_link} href="/user">
                  <HiUsers className={styles.navbar_icon}/> 
                  <label className={styles.navbar_text}>User</label>
                </Link>
              </li>
              <li>
                <Link className={styles.navbar_link} href="/news">
                  <HiNewspaper className={styles.navbar_icon}/> 
                  <label className={styles.navbar_text}>News</label>
                </Link>
              </li>
              <li>
                <Link className={styles.navbar_link} href="/message">
                  <BiSolidMessageRoundedDetail className={styles.navbar_icon}/> 
                  <label className={styles.navbar_text}>Message</label>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
