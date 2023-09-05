import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Nav";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/Home";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};
export default App;
