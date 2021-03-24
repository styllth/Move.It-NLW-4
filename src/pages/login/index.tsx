import { GetServerSideProps } from "next";
import Head from "next/head";

import LoginContainer from "./components/loginContainer";

import styles from "styles/pages/login/Login.module.css";

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Head>
          <title>Login | move.it</title>
        </Head>
        <section>
          <div></div>
          <div>
            <img
              className={styles.logo}
              src="/logo-full-white.svg"
              alt="Logo move it"
            />
            <LoginContainer />
          </div>
        </section>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { currentUser } = req.cookies;

  if (currentUser) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
