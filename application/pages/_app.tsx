import "../styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "../components/footer";
import Navigation from "../components/navigation";
import React, { useState } from "react";
import ScoreContext from "../context/user";
import { User } from "../context/user";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <ScoreContext.Provider
      value={{
        user: user,
        setUser: (user: User | null) => setUser(user),
      }}
    >
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </ScoreContext.Provider>
  );
}
