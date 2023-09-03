import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import New from "./pages/New";
import Note from "./pages/Note";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useState } from "react";
import { getUsername, isUserLoggedIn } from "./slices/noteSlice";
import store from "./store/store";

function App() {
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("");

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
        <Route path="/note-taking-app/" element={<Home />} />
        <Route path="/note-taking-app/new" element={<New />} />
        <Route path="/note-taking-app/note/:id" element={<Note />} />
        <Route path="/note-taking-app/register" element={<Register />} />
        <Route
          path="/note-taking-app/login"
          element={<Login logIn={logIn} setNavUsername={setUsername} />}
        />
      </Routes>
    </>
  );
}

export default App;
