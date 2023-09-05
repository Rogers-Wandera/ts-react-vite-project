import React, { useState, useEffect, createContext } from "react";
export type usertype = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type userStateContextType = {
  users: usertype[];
  addNewUser: (obj: usertype) => Promise<usertype>;
};

const initstatecontext: userStateContextType = {
  users: [],
  addNewUser: async (obj: usertype) => obj,
};

export const UserContext =
  createContext<userStateContextType>(initstatecontext);

type childrentypes = {
  children?: React.ReactElement | React.ReactElement[];
};

const UserProvider = ({ children }: childrentypes) => {
  const [users, setUsers] = useState<usertype[]>([]);

  useEffect(() => {
    const fetchUsers = async (): Promise<usertype[]> => {
      const response = await fetch("http://localhost:3500/users", {
        method: "GET",
      })
        .then((res) => res.json())
        .catch((err) => {
          if (err instanceof Error) {
            return err.message;
          }
        });
      return response;
    };
    fetchUsers().then((data) => setUsers(data));
  }, []);

  const addNewUser = async (user: usertype): Promise<usertype> => {
    const response = await fetch("http://localhost:3500/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .catch((err) => {
        if (err instanceof Error) {
          return err.message;
        }
      });
    return response;
  };

  return (
    <UserContext.Provider value={{ users, addNewUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
