import Head from "next/head";
import { GetStaticProps } from "next";
import Cookies from "js-cookie";

import { Sidebar } from "components/Sidebar";

import styles from "styles/pages/Leaderboard.module.css";

import leadersboard from "../../leaderboard.json";

interface LeaderboardUsers {
  username: string;
  imagePath: string;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

interface LeaderboardProps {
  leaders: LeaderboardUsers[];
}

export default function leaderboard({ leaders }: LeaderboardProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Move.It | Leaderboard</title>
      </Head>

      <Sidebar page="leaderboard" />

      <div className={styles.leaderboard}>
        <strong>Leaderboard</strong>

        <section className={styles.info}>
          <p>POSIÇÃO</p>
          <p>USUÁRIO</p>
          <p>DESAFIOS</p>
          <p>EXPERIÊNCIA</p>
        </section>

        {leaders.map((leader, index) => (
          <div className={styles.users}>
            <div className={styles.position}>{index + 1}</div>

            <div className={styles.userInfo}>
              <div className={styles.user}>
                <img src={leader.imagePath} alt="user image" />

                <div>
                  <strong>{leader.username}</strong>
                  <p>
                    <img src="icons/level.svg" alt="level" />
                    Level {leader.level}
                  </p>
                </div>
              </div>

              <div className={styles.text}>
                <p>{leader.challengesCompleted}</p>
                <p>completados</p>
              </div>

              <div className={styles.text}>
                <p>{leader.currentExperience}</p>
                <p>xp</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const leaders = leadersboard;

  return {
    props: {
      leaders,
    },
    revalidate: 60,
  };
};
