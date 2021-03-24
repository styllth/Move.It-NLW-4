import Head from "next/head";
import { GetServerSideProps } from "next";

import { ChallengeBox } from "components/ChallengeBox";
import { ExperienceBar } from "components/ExperienceBar";
import { Profile } from "components/Profile";
import { Countdown } from "components/Countdown";
import { CompletedChallenges } from "components/CompletedChallenges";

import { ChallengesProvider } from "contexts/ChallengesContext";
import { CountdownProvider } from "contexts/CountdownContext";

import styles from "styles/pages/Home.module.css";
import { deserializeUser } from "utils";
import { Sidebar } from "components/Sidebar";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home({
  level,
  currentExperience,
  challengesCompleted,
}: HomeProps): JSX.Element {
  return (
    <ChallengesProvider
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      <CountdownProvider>
        <main className={styles.container}>
          <Head>
            <title>Move.It | Início</title>
          </Head>

          <Sidebar page="dashboard" />

          <div className={styles.challengesContainer}>
            <ExperienceBar />

            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </div>
        </main>
      </CountdownProvider>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const {
    level,
    currentExperience,
    challengesCompleted,
    currentUser,
  } = req.cookies;

  const user = deserializeUser(currentUser);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      user,
    },
  };
};
