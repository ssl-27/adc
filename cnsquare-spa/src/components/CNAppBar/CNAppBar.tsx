import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import LinkButton from "../LinkButton";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

function CNAppBar() {
  const { user, removeUser } = useContext(UserContext);
  const userButton =
    user.id === null ? (
      <LinkButton color="inherit" href="/login" label="Login" />
    ) : (
      <Button color="inherit" onClick={removeUser}>
        Logout
      </Button>
    );
  return (
    <AppBar>
      <Toolbar>
        <Typography sx={{ mr: 1, display: { xs: "none", md: "flex" } }}>
          CN-Square
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <LinkButton color="inherit" href="/" label="Home" />
          <LinkButton color="inherit" href="/shop" label="Shop" />
        </Box>
        <Box>
          {userButton}
          <LinkButton color="inherit" href="/cart" label="My Cart" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default CNAppBar;
