import { useContext } from "react";
import WithAuth from "../hocs/authUserHoc";
import { AuthUserContext } from "../context/authUserContext";

const Home = () => {
  const {
    authuser: { username },
  } = useContext(AuthUserContext);
  return (
    <div>
      <h3>Welcome {username}</h3>
    </div>
  );
};

export default WithAuth(Home);
