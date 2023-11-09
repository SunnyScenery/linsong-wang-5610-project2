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
import { useContext } from "react";
import { RecordContext } from "../store/records";

function Homepage() {
  const [selectedValue, setSelectedValue] = useState("normal");
  const [records, setRecords] = useContext(RecordContext);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const clearCache = () => {
    localStorage.clear();
    setRecords([]);
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
          Play & Continue
        </Button>
      </Link>
      <Button variant="contained" onClick={clearCache}>
        Clear Cache
      </Button>
    </Box>
  );
}

export default Homepage;
