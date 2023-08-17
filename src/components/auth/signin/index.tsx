import { signIn } from "next-auth/react";
import styles from "~/components/header/styles.module.css"
import { FaSignInAlt } from 'react-icons/fa';

export default function Signin() {

  const handleSignIn = () => {
    signIn();
  };

  return (
    <button
      onClick={handleSignIn}
    >
      <FaSignInAlt className={styles.header_links_icon}/> 
      <label className={styles.header_text}>Sign in</label>
    </button>
  );
}
