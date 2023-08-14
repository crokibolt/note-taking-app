import { Box, Container } from "@mui/material";
import { useAppDispatch } from "../hooks/redux";
import { remove, selectNotes } from "../slices/noteSlice";
import { useState } from "react";
import store from "../store/store";
import NoteCard from "../components/NoteCard";

function Home() {
  const [notes, setNotes] = useState(selectNotes(store.getState()));
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
        {notes.map((x) => (
          <NoteCard note={x} handleRemove={removeNote} />
        ))}
      </Box>
    </Container>
  );
}

export default Home;
