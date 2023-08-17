import { useSession } from "next-auth/react";
import styles from "~/components/profile/styles.module.css"

export default function Profile() {
  const { data: sessionData, status } = useSession();

  if (status === "authenticated") {
    return (
      <section className={styles.section}>
        <p>{sessionData.user.name}</p>
        <p>{sessionData.user.email}</p>
        {sessionData.user.image && (
          <div className={styles.img_box}>
            <img
              src={sessionData.user.image}
              alt="User Image"
              className={styles.img}
            />
          </div>
        )}
      </section>
    );
  } 
}
