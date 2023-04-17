import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LinkButton from "../LinkButton";
import MenuDropdown from "./MenuDropdown";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import MemberInfo from "./MemberInfo";
import { useNavigate } from "react-router-dom";

function CNAppBar() {
  const { user, cart } = useContext(UserContext);

  const navigate = useNavigate();

  const AccountButton =
    user.id === null ? (
      <LinkButton color="inherit" href="/login" label="Login" />
    ) : (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <MemberInfo />
        <MenuDropdown />
      </Box>
    );

  const handleNavCart = (event: any) => {
    event.preventDefault();
    navigate("/cart");
  };
  
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
          <Badge
            badgeContent={cart === null ? 0 : cart.length}
            color={"secondary"}
          >
            <IconButton color="inherit" onClick={(e) => handleNavCart(e)}>
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default CNAppBar;
