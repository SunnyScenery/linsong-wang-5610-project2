import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
import WordleTitle from "../components/wordle-title";
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useState } from "react";

function Homepage() {
  const [selectedValue, setSelectedValue] = useState("normal");

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

      <FormControl component="fieldset" style={{ marginBottom: "15px" }}>
        <FormLabel component="legend">Difficulty</FormLabel>
        <RadioGroup
          aria-label="difficulty"
          defaultValue="normal"
          name="radio-buttons-group"
          onChange={handleChange}
        >
          <FormControlLabel value="normal" control={<Radio />} label="Normal" />
          <FormControlLabel value="hard" control={<Radio />} label="Hard" />
        </RadioGroup>
      </FormControl>

      <Link to="/play" state={{ selectedValue: selectedValue }}>
        <Button variant="contained" style={{ marginBottom: "15px" }}>
          Play
        </Button>
      </Link>
      {/* <Link to="/play">
        <Button variant="contained">Play - Continue</Button>
      </Link> */}
    </Box>
  );
}

export default Homepage;
