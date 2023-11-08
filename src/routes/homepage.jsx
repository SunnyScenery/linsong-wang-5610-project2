import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import WordleTitle from "../components/wordle-title";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { useState } from "react";
import { blue } from "@material-ui/core/colors";

function Homepage() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={2}
    >
      <div>
        <WordleTitle />
      </div>
      <Link to="/rules" style={{ marginBottom: "15px" }}>
        <Button variant="contained">Rules</Button>
      </Link>
      <FormControl fullWidth style={{ marginBottom: "15px" }}>
        <InputLabel
          id="demo-simple-select-label"
          style={{
            color: "white",
          }}
        >
          Options
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label="Options"
          onChange={handleChange}
          style={{
            backgroundColor: blue[500],
            color: "white",
          }}
          MenuProps={{
            PaperProps: {
              style: {
                backgroundColor: blue[500],
                color: "white",
              },
            },
          }}
        >
          <MenuItem value={10}>Normal</MenuItem>
          <MenuItem value={20}>Hard</MenuItem>
        </Select>
      </FormControl>

      <Link to="/play">
        <Button variant="contained" style={{ marginBottom: "15px" }}>Play - New</Button>
      </Link>
      <Link to="/play">
        <Button variant="contained">Play - Continue</Button>
      </Link>
    </Box>
  );
}

export default Homepage;
