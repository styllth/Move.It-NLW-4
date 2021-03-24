import axios from "axios";
import { GetServerSideProps } from "next";
import { createContext, ReactNode, useState } from "react";

import { User } from "auth/userInterface";

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextData {
  user: User;
  setUser(user: User): void;
  signIn: (username: string) => void;
  signOut: () => void;
}

export const UserContext = createContext({} as UserContextData);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState({} as User);

  async function signIn(username: string) {
    const responseOfUser = await axios.get(`api/user/${username}`);
    setUser(responseOfUser.data);
  }

  async function signOut() {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, setUser, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};
