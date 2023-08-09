import { Box, Container, Typography } from "@mui/material";
import { selectNotes } from "../slices/noteSlice";
import { useState } from "react";
import store from "../store/store";
import NoteCard from "../components/NoteCard";

function Home() {
  const notes = selectNotes(store.getState());
  console.log(notes);
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
          gap: "2.5rem",
          flexWrap: "wrap",
          borderRadius: "0.25rem",
          mt: "8px",
        }}
      >
        {notes.map((x) => (
          <NoteCard note={x} />
        ))}
      </Box>
    </Container>
  );
}

export default Home;
