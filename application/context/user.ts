import React from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  telephone: string;
  token: {
    $date: Date;
  };
}

interface State {
  user: User | null;
  setUser: (user: User | null) => void;
}

const Context = React.createContext<State>({
  user: null,
  setUser: (user: User | null) => {},
});

export default Context;
