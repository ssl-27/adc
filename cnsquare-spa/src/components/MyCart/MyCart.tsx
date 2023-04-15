import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import ProductCartCard from "./ProductCartCard";
import { ReactElement, useEffect, useState } from "react";
import LinkButton from "../LinkButton";

function MyCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartComponents, setCartComponents] = useState<ReactElement[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  // check localstorage and update cart
  useEffect(() => {
    const storedCart = JSON.parse(
      window.localStorage.getItem("cart") as string
    );
    if (storedCart !== null) {
      setCart(storedCart);
    }
  }, []);
  const removeCartItemByIndex = (id: number) => {
    const newCart = cart.filter((v) => v.id !== id);
    window.localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };
  const updateQuantity = (id: number, quantity: number) => {
    // Need to create new array to fire the useEffect after setCart
    const i = cart.findIndex((v) => v.id === id);
    const newCart = cart.filter((v) => v.id !== id);
    const cartItem = cart.find((v) => v.id === id) as CartItem;
    cartItem.quantity = quantity;
    newCart.splice(i, 0, cartItem);
    window.localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };
  useEffect(() => {
    setCartComponents(
      cart.map((v) => (
        <ProductCartCard
          key={v.id}
          info={v}
          removeItem={() => removeCartItemByIndex(v.id)}
          updateCount={(e) => updateQuantity(v.id, e.target.value)}
        />
      ))
    );
    setSubTotal(
      cart.reduce<number>((prev, curr) => prev + curr.price * curr.quantity, 0)
    );
  }, [cart]);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "5px",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h6">My Cart</Typography>
          <Divider sx={{ mb: "5px" }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {cartComponents}
          </Box>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6">Order Summary</Typography>
          <Divider sx={{ mb: "5px" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>Sub-total</Typography>
            <Typography>{`HKD$${subTotal}`}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>Shipping</Typography>
            <Typography>FREE</Typography>
          </Box>
          <Divider sx={{ mb: "5px" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>Total</Typography>
            <Typography>{`HKD$${subTotal}`}</Typography>
          </Box>
          <Divider />
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <LinkButton href="/checkout" label="Check Out" />
        </CardActions>
      </Card>
    </Container>
  );
}
export default MyCart;
