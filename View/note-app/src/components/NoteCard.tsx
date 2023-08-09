import { Box, Typography } from "@mui/material";
import React from "react";

interface Note {
  id: string;
  title: string;
  categories: string[];
  body: string;
}

interface CardProps {
  note: Note;
}

function NoteCard(props: CardProps) {
  return (
    <Box
      sx={{
        width: "300px",
        height: "450px",
        boxShadow: "4px 6px 4px gray",
        borderRadius: "0.25rem",
        background: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="h3">{props.note.title}</Typography>
      <Typography variant="subtitle1">
        Categories: {props.note.categories.join(" ")}
      </Typography>
      <Typography variant="body1">{props.note.body}</Typography>
    </Box>
  );
}

export default NoteCard;
