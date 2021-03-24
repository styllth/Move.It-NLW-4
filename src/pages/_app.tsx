import { AppProps } from "next/app";
import { UserProvider } from "../contexts/UserContext";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
