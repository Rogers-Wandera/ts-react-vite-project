import { useContext } from "react";
import { UserContext, userStateContextType } from "../context/UserContext";

const useUserContext = (): userStateContextType => {
  return useContext(UserContext);
};

export default useUserContext;
