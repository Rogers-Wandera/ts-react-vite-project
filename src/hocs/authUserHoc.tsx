import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/authUserhook";

const WithAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const AuthenticatedUser: React.FC<P> = (props) => {
    const {
      authuser: { username },
    } = useAuthUser();
    const navigate = useNavigate();

    useEffect(() => {
      console.log(username);
      if (!username) {
        navigate("/login");
      }
    }, []);

    return username ? <Component {...props} /> : null;
  };
  return AuthenticatedUser;
};
export default WithAuth;
