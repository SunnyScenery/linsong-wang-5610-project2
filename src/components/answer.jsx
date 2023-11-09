import { Typography } from "@material-ui/core";

function Answer(props) {
  return (
    <Typography variant="h4" sx={{ color: "text.primary" }}>
      {props.text}
    </Typography>
  );
}

export default Answer;
