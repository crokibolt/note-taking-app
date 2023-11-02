import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import New from "./pages/New";
import Note from "./pages/Note";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const [logged, setLogged] = useState(false);

  const logIn = () => {
    setLogged(true);
  };

  const logOut = () => {
    setLogged(false);
  };

  return (
    <>
      <Navbar appLogged={logged} logoutFunc={logOut} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/note/:id" element={<Note />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login logIn={logIn} />}
        />
      </Routes>
    </>
  );
}

export default App;
