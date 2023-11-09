import { Button, TextField, Box } from '@material-ui/core';
import { useContext, useState } from 'react';
import { InputContext } from '../store/input';

function InputForm(props) {
    const [inputValue, setInputValue] = useContext(InputContext);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    props.callBack();
    console.log(inputValue);
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
}

export default InputForm;