import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function LinkButton({ href, label }) {
  return (
    <Button color="inherit" component={Link} href={href} to={href}>
      {label}
    </Button>
  );
}
export default LinkButton;
