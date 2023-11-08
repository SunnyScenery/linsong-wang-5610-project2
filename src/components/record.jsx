import { Box, Paper, Typography } from '@material-ui/core';

function InputRecord() {
    const word = "ABCD";

    return (
    <Box display="flex" justifyContent="center">
      {word.split('').map((char, index) => (
        <Paper 
          key={index} 
          elevation={3}
          sx={{
            p: 1, 
            m: 1,
            textAlign: 'center',
            minWidth: '1rem',
            height: '2rem',
            lineHeight: '2rem', // vertically center the text
          }}
        >
          <Typography variant="h6" component="span" sx={{ lineHeight: 'inherit' }}>
            {char}
          </Typography>
        </Paper>
      ))}
    </Box>
    )
}

export default InputRecord;