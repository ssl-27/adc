import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import LinkButton from "../LinkButton";
import MenuDropdown from "./MenuDropdown";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

function CNAppBar() {
  const { user } = useContext(UserContext);
  const AccountButton =
    user.id === null ? (
      <LinkButton color="inherit" href="/login" label="Login" />
    ) : (
      <MenuDropdown />
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
        <Box sx={{ display: "flex" }}>
          {AccountButton}
          <LinkButton color="inherit" href="/cart" label="My Cart" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default CNAppBar;
