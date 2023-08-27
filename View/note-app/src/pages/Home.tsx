import { Box, Container, Typography } from "@mui/material";
import { useAppDispatch } from "../hooks/redux";
import { isUserLoggedIn, remove, selectNotes } from "../slices/noteSlice";
import { useState } from "react";
import store from "../store/store";
import NoteCard from "../components/NoteCard";

function Home() {
  const [notes, setNotes] = useState(selectNotes(store.getState()));
  const [logged, setLogged] = useState(isUserLoggedIn(store.getState()));

  const dispatch = useAppDispatch();
  const removeNote = (id: string) => {
    dispatch(remove(id));
    setNotes(selectNotes(store.getState()));
  };
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
            <NoteCard key={x.id} note={x} handleRemove={removeNote} />
          ))
        ) : (
          <Typography variant="h1">Log in to start writing notes!</Typography>
        )}
      </Box>
    </Container>
  );
}

export default Home;
