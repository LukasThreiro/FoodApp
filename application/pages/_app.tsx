import "../styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "../components/footer";
import Navigation from "../components/navigation";
import React, { useEffect, useState } from "react";
import UserContext from "../context/user";
import DishContext from "../context/dish";
import { User } from "../context/user";
import { Dish } from "../context/dish";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    const dishes = localStorage.getItem("dishes");
    if (dishes !== null) {
      const data: Dish[] = JSON.parse(dishes);
      setDishes(data);
    }

    const user = localStorage.getItem("user");
    if (user === null) {
      return;
    }

    const data: User | null = JSON.parse(user);
    setUser(data);
  }, []);

  return (
    <DishContext.Provider
      value={{
        dishes: dishes,
        setDishes: (dishes: Dish[]) => {
          localStorage.setItem("dishes", JSON.stringify(dishes));
          setDishes(dishes);
        },
      }}
    >
      <UserContext.Provider
        value={{
          user: user,
          setUser: (user: User | null) => {
            setUser(user);
            if (user === null) {
              localStorage.removeItem("user");
            } else {
              localStorage.setItem("user", JSON.stringify(user));
            }
          },
        }}
      >
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </UserContext.Provider>
    </DishContext.Provider>
  );
}
