import { useContext } from "react";
import { AuthUserContext, authcontexttype } from "../context/authUserContext";

const useAuthUser = (): authcontexttype => {
  return useContext(AuthUserContext);
};

export default useAuthUser;
