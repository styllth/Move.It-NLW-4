import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useUser } from "hooks/useUser";

import { serializeUser } from "utils";

import styles from "styles/pages/login/LoginContainer.module.css";

export default function loginContainer() {
  const router = useRouter();
  const { user, setUser, signIn } = useUser();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);

    if (error) {
      setError("");
    }
  }

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (username.trim().length < 3) {
        inputRef.current.focus();
        return setError("Digite pelo menos 3 caracteres");
      }

      try {
        signIn(username);

        if (!user) {
          throw new Error(
            `Não foi possível obter os dados do usuário "${username}".`
          );
        }

        Cookies.set("currentUser", serializeUser(user));
        Cookies.set("level", "1");
        Cookies.set("currentExperience", "0");
        Cookies.set("challengesCompleted", "0");
        router.push("/");
      } catch (err) {
        console.log(err);
        inputRef.current.focus();
        return setError(err.message);
      }
    },
    [username]
  );

  useEffect(() => {
    inputRef.current.focus();
    router.prefetch("/");
  }, []);

  return (
    <div className={styles.loginContainer}>
      <header>Bem-vindo</header>
      <p>
        <img src="/icons/github.svg" alt="Logo GitHub" />
        Faça login com seu GitHub para começar
      </p>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div className={styles.field}>
          <input
            ref={inputRef}
            name="username"
            autoComplete="off"
            type="text"
            placeholder="Digite seu username"
            onChange={handleUsernameChange}
          />
          <button
            type="submit"
            className={`${
              user?.username?.length >= 3 ? styles.buttonActive : ""
            }`}
          >
            <img src="/icons/arrow-right.svg" alt="" />
          </button>
          <div className={styles.formError}>{!!error && error}</div>
        </div>
      </form>
    </div>
  );
}
