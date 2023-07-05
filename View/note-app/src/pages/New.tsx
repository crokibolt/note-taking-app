import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  TextField,
  Typography,
} from "@mui/material";

function New() {
  const categories = ["Lifestyle", "Food", "Work", "Fitness"];
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
          />
          <Autocomplete
            multiple
            id="tags-input"
            options={categories.map((option) => option)}
            defaultValue={[categories[1]]}
            freeSolo
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
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
        >
          Create new note
        </Button>
      </Box>
    </Container>
  );
}

export default New;
