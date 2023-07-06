import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { add } from "../slices/noteSlice";

function New() {
  const InitCategories = ["Lifestyle", "Food", "Work", "Fitness"];
  const categories: string[] = [];
  const [title, setTitle] = useState("");
  const [selectedCategories, setCategories] = useState(categories);
  const [options, setOptions] = useState(InitCategories);
  const [body, setBody] = useState("");
  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFunction: (a: string) => void
  ) => {
    if (e.target.value != null) {
      setFunction(e.target.value);
    }
  };

  const handleAdd = () => {
    dispatch(add({ title, categories: selectedCategories, body }));
    resetState();
  };

  const resetState = () => {
    setTitle("");
    setCategories([]);
    setBody("");
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
          width: "85vw",
          height: "100%",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="title-input"
            label="Title"
            variant="outlined"
            sx={{ width: "60%" }}
            value={title}
            onChange={(e) => {
              handleChange(e, setTitle);
            }}
          />
          <Autocomplete
            multiple
            freeSolo
            id="tags-input"
            options={options.map((option) => option)}
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => {
                if (!selectedCategories.includes(option)) {
                  setCategories((prev) => {
                    const next = [...prev];
                    if (!next.includes(option)) {
                      next.push(option);
                    }
                    return next;
                  });
                }
                if (!options.includes(option)) {
                  setOptions((prev) => {
                    const next = [...prev];
                    if (!next.includes(option)) {
                      next.push(option);
                    }
                    return next;
                  });
                }
                return (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                );
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                id="category"
                variant="outlined"
                label="Tags"
                placeholder="Ex. Fitness"
              />
            )}
            sx={{ width: "38%", display: "inline-block" }}
          />
        </Box>
        <TextField
          id="content-input"
          label="Content"
          variant="outlined"
          value={body}
          onChange={(e) => {
            handleChange(e, setBody);
          }}
          sx={{ width: "100%", mt: 3 }}
          multiline={true}
          minRows="15"
          maxRows="27"
        />
        <Button
          variant="contained"
          sx={{
            mt: 3,
            maxWidth: "200px",
          }}
          onClick={handleAdd}
        >
          Create new note
        </Button>
      </Box>
    </Container>
  );
}

export default New;
