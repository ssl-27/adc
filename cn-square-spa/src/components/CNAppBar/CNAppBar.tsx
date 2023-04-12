import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import LinkButton from "../LinkButton";

function CNAppBar() {
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
          <LinkButton href="/login" label="Login" />
          <LinkButton href="/cart" label="My Cart" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default CNAppBar;
