import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

function BackButton() {
  let navigateTo = useNavigate();

  return (
    <Button variant="contained" onClick={() => navigateTo("/")}>
      Go Back
    </Button>
  );
}

export default BackButton;
