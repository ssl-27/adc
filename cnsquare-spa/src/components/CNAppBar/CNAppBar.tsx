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
import { useContext, useEffect, useState } from "react";
import MemberInfo from "./MemberInfo";
import { useNavigate } from "react-router-dom";
import CSS from 'csstype';

function CNAppBar() {
  const { user, cart } = useContext(UserContext);
  const [quantity, setQuantity] = useState<number>(0);
  useEffect(() => {
    setQuantity(
      cart === null
        ? 0
        : cart.reduce<number>((prev, curr) => prev + Number(curr.quantity), 0)
    );
  }, [cart]);
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

  const logoStyle: CSS.Properties = {    
    height: "64px",
    width: "64px",
    mixBlendMode: "multiply",
  }

  return (
    <AppBar color={"primary"}>
      <Toolbar>
        <img src="/logo.jpg" alt="logo" style={logoStyle}/>
        <Box sx={{ flexGrow: 1, ml: 3 }}>
          <LinkButton color="inherit" href="/" label="Home" />
          <LinkButton color="inherit" href="/shop" label="Shop" />
        </Box>
        <Box sx={{ display: "flex" }}>
          {AccountButton}
          <Badge badgeContent={quantity} color={"secondary"}>
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
