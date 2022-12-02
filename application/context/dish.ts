import React from "react";

export interface Dish {
  _id: string;
  name: string;
  price: number;
  description: string;
  restaurant_key: string;
  image: string;
}

interface State {
  dishes: Dish[];
  setDishes: (dishes: Dish[]) => void;
}

const Context = React.createContext<State>({
  dishes: [],
  setDishes: (dishes: Dish[]) => {},
});

export default Context;
