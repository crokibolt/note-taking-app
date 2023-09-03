import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function New() {
  const InitCategories = ["Lifestyle", "Food", "Work", "Fitness"];
  const categories: string[] = [];
  const [title, setTitle] = useState("");
  const [selectedCategories, setCategories] = useState(categories);
  const [options, setOptions] = useState(InitCategories);
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      await fetch("https://note-api-v1.onrender.com/api/note/logCheck", {
        method: "GET",
        mode: "cors",
        credentials: "include",
      })
        .then((res) => {
          if (res.status == 401) {
            navigate("/note-taking-app/");
          }
        })
        .catch((err) => console.log(err));
    };
    func();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFunction: (a: string) => void
  ) => {
    if (e.target.value != null) {
      setFunction(e.target.value);
    }
  };

  const handleAdd = () => {
    if (title.length > 0 && selectedCategories.length > 0 && body.length > 0) {
      const reqBody = {
        Title: title.trim(),
        Categories: selectedCategories,
        Body: body,
      };
      const func = async () => {
        await fetch("https://note-api-v1.onrender.com/api/note/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(reqBody),
        }).then(() => resetState());
      };
      func();
      navigate("/note-taking-app/");
      navigate(0);
    }
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
            required
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
          required
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
