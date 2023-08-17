import { signOut } from "next-auth/react";
import styles from "~/components/header/styles.module.css"
import { FaSignOutAlt } from 'react-icons/fa';

export default function Signout() {

  const handleSignIn = () => {
    signOut();
  };

  return (
    <button
      onClick={handleSignIn}
    >
      <FaSignOutAlt className={styles.header_links_icon}/> 
      <label className={styles.header_text}>Sign out</label>
    </button>
  );
}
