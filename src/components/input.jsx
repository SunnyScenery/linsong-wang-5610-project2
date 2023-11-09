import { Button, TextField, Box } from "@material-ui/core";
import { useContext, useState } from "react";
import { InputContext } from "../store/input";

function InputForm(props) {
  const [inputValue, setInputValue] = useContext(InputContext);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.callback();
    console.log(inputValue);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Enter text"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
}

export default InputForm;
