import { Box, Paper, Typography } from '@material-ui/core';

function InputRecord(props) {

    const build = (word, colormap) => {
        console.log(colormap);
        const record = [];
        for (let i = 0; i < word.length; i++) {
            let newColor = 'white';
            if (colormap[i] === '1') {
                newColor = 'green';
            } else if (colormap[i] === '2') {
                newColor = 'yellow';
            }
            record.push(<Paper 
                key={i}
                elevation={3}
                sx={{
                  p: 1, 
                  m: 1,
                  textAlign: 'center',
                  minWidth: '1rem',
                  height: '2rem',
                  lineHeight: '2rem', // vertically center the text
                  backgroundColor: newColor,
                  color: 'black'
                }}
              >
                <Typography variant="h6" component="span" sx={{ lineHeight: 'inherit' }}>
                  {word[i]}
                </Typography>
              </Paper>)
        }

        return record;
    }

    return (
    <Box display="flex" justifyContent="center">
      {build(props.word, props.colormap)}
    </Box>
    )
}

export default InputRecord;