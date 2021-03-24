import { useChallenges } from "../hooks/useChallenges";

import styles from "../styles/components/Profile.module.css";
import { useUser } from "../hooks/useUser";

export function Profile() {
  const { level } = useChallenges();
  const { user } = useUser();

  return (
    <div className={styles.profileContainer}>
      <img
        src={user.avatarUrl ?? "https://github.com/styllth.png"}
        alt="avatar"
      />
      <div>
        <strong>{user.name ?? "nome"}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
