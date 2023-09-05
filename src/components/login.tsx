import React, { useState } from "react";
import useUserContext from "../hooks/Userhooks";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/authUserhook";

function Login() {
  const { users } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    authuser: { username },
    loginUser,
  } = useAuthUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (username.length > 0) {
      navigate("/");
    }
  }, []);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const userExists = users.find((user) => user.email === email);

    if (!userExists) {
      setError("No user found with that email.");
      return;
    }

    const checkpassword = password === userExists.password;

    if (!checkpassword) {
      setError("Please provide a correct password.");
      return;
    }
    localStorage.setItem("user", email);
    await loginUser();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
