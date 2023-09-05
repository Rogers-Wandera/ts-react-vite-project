import { ReactElement, createContext, useState } from "react";
import { usertype } from "./UserContext";
import { useNavigate } from "react-router-dom";

export type authUser = {
  username: string;
  id: string;
};

export type authcontexttype = {
  authuser: authUser;
  loginUser: () => void;
  logOut: () => void;
};

const authcontextstate: authcontexttype = {
  authuser: { username: "", id: "" },
  loginUser: () => {},
  logOut: () => {},
};

export const AuthUserContext = createContext<authcontexttype>(authcontextstate);

type childrenprops = {
  children: ReactElement | ReactElement[];
};

const AuthUserProvider = ({ children }: childrenprops) => {
  const [user, setUser] = useState<authUser>({ username: "", id: "" });
  const getUser: string | null = localStorage.getItem("user");
  const navigate = useNavigate();

  const getActiveUser = async (): Promise<usertype> => {
    if (getUser === null || getUser === "") {
      return { id: "", username: "", email: "", password: "" };
    }
    const response = await fetch(`http://localhost:3500/users?email=${getUser}`)
      .then((res) => res.json())
      .catch((err) => {
        if (err instanceof Error) {
          return err.message;
        }
      });
    const userData = { ...response[0] };
    return userData;
  };

  const loginUser = async () => {
    await getActiveUser().then((res) => {
      setUser({ username: res.username, id: res.id });
      navigate("/");
    });
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setUser({ username: "", id: "" });
    navigate("/login");
  };

  const newStae = {
    authuser: { username: user.username, id: user.id },
    loginUser: loginUser,
    logOut: logOut,
  };

  return (
    <AuthUserContext.Provider value={{ ...newStae }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserProvider;
