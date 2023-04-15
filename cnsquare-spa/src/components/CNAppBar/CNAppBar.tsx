import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import LinkButton from "../LinkButton";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

function CNAppBar() {
  const { user, removeUser } = useContext(UserContext);
  const userButton =
    user.id === null ? (
      <LinkButton href="/login" label="Login" />
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
          <LinkButton href="/" label="Home" />
          <LinkButton href="/shop" label="Shop" />
        </Box>
        <Box>
          {userButton}
          <LinkButton href="/cart" label="My Cart" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default CNAppBar;
