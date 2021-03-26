import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import styles from "../styles/components/Sidebar.module.css";
import { useUser } from "../hooks/useUser";

interface SidebarProps {
  page: "dashboard" | "leaderboard";
}

export function Sidebar({ page }: SidebarProps) {
  const { signOut } = useUser();
  const router = useRouter();

  function handleLogout() {
    signOut();
    Cookies.remove("currentUser");
    Cookies.remove("level");
    Cookies.remove("currentExperience");
    Cookies.remove("challengesCompleted");
    router.reload();
  }

  return (
    <div className={styles.container}>
      <img src="/logo_blue.svg" alt="logo" />

      <div className={styles.options}>
        <button disabled={page === "dashboard"}>
          <Link href="/" replace>
            <a>
              {page === "dashboard" ? (
                <img src="/icons/home_blue.svg" alt="award" />
              ) : (
                <img src="/icons/home.svg" alt="award" />
              )}
            </a>
          </Link>
        </button>

        <button disabled={page === "leaderboard"}>
          <Link href="/leaderboard" replace>
            <a>
              {page === "leaderboard" ? (
                <img src="/icons/award_blue.svg" alt="award" />
              ) : (
                <img src="/icons/award.svg" alt="award" />
              )}
            </a>
          </Link>
        </button>
      </div>

      <button onClick={handleLogout}>
        <img src="/icons/logout.svg" alt="logout" />
      </button>
    </div>
  );
}
