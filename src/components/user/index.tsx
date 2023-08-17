import { api } from '~/utils/api';
import { useSession } from "next-auth/react";
import styles from "~/components/user/styles.module.css"

export default function User() {
  const { status } = useSession();
  const {data} = api.user.getAll.useQuery();

  if (status === "authenticated") {
    return (
      <section className={styles.section}>
        <h2>Tous les utilisateurs :</h2>
        <ul>
          {data?.map((user) => (
            <li key={user.id}>
              <p>{user.name}</p>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
