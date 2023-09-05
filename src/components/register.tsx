import React, { useState } from "react";
import useUserContext from "../hooks/Userhooks";
import { useNavigate } from "react-router-dom";

function Register() {
  const { users, addNewUser } = useUserContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim().length && !password.trim().length && !username.length) {
      throw new Error("Please all fields are required");
    }
    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      throw new Error(`User with email ${email} already exist`);
    }
    const id = users.length > 0 ? Number(users[users.length - 1].id) + 1 : 1;
    const userobject = { id: id.toString(), username, email, password };
    const response = await addNewUser(userobject).then((res) => res);
    if (response?.username) {
      navigate("/login");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
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
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
