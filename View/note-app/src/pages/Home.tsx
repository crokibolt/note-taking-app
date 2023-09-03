import { Box, Container, Typography } from "@mui/material";
import { selectNotes } from "../slices/noteSlice";
import { useEffect, useState } from "react";
import store from "../store/store";
import NoteCard from "../components/NoteCard";

function Home() {
  const [notes, setNotes] = useState(selectNotes(store.getState()));
  const [logged, setLogged] = useState(false);

  const fetchNotes = async () => {
    const resp = await fetch("https://note-api-v1.onrender.com/api/note/", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });

    resp
      .json()
      .then((data) => {
        setLogged(true);
        setNotes(data.notes);
      })
      .catch((err) => {
        console.log(err);
        setLogged(false);
      });
  };

  const removeNote = (id: string) => {
    const deleteNote = async () => {
      await fetch(`https://note-api-v1.onrender.com/api/note/${id}`, {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
      })
        .then(() => fetchNotes())
        .catch((err) => console.log(err));
    };

    deleteNote();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Container
      maxWidth={false}
      sx={{
        bgcolor: "#FCF6E9",
        height: { xs: "calc(100vh - 60px)", md: "calc(100vh - 70px)" },
        py: 4,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "2.5rem",
          flexWrap: "wrap",
          borderRadius: "0.25rem",
          mt: "8px",
          overflowY: "auto",
        }}
      >
        {logged ? (
          notes.map((x) => (
            <NoteCard key={x.ID} note={x} handleRemove={removeNote} />
          ))
        ) : (
          <Typography variant="h1">Log in to start writing notes!</Typography>
        )}
      </Box>
    </Container>
  );
}

export default Home;
