import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import New from "./pages/New";
import Note from "./pages/Note";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/note/:id" element={<Note />} />
      </Routes>
    </>
  );
}

export default App;
