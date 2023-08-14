import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

interface Note {
  id: string;
  title: string;
  categories: string[];
  body: string;
}

interface CardProps {
  note: Note;
  handleRemove: Function;
}

function NoteCard(props: CardProps) {
  const [show, setShow] = useState(false);
  return (
    <Box
      sx={{
        width: { xs: "340px", md: "500px" },
        height: { xs: "250px", md: "350px" },
        boxShadow: "4px 6px 4px gray",
        borderRadius: "0.25rem",
        background: "white",
        textAlign: "center",
        px: 4,
        py: 2,
        display: "flex",
        flexDirection: "column",
      }}
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
    >
      <Typography variant="h3">{props.note.title}</Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "600",
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
        }}
      >
        Categories: {props.note.categories.join(" ")}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        {props.note.body}
      </Typography>
      {show && (
        <Button
          variant="contained"
          color="error"
          sx={{ mt: "auto", mx: "auto" }}
          onClick={() => props.handleRemove(props.note.id)}
        >
          Delete
        </Button>
      )}
    </Box>
  );
}

export default NoteCard;
