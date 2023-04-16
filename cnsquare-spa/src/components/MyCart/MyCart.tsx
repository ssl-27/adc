import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
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
        gap: "30px",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h6" textAlign={"center"}>My Cart</Typography>
          <Divider sx={{ mb: "5px" }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "250px", minHeight: "200px"}}>
            {cartComponents.length === 0 ? <Typography textAlign={"center"}>Cart is empty.</Typography>: (cartComponents)}
          </Box>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Grid container width={"250px"}>
            <Grid xs={12}>
              <Typography variant="h6" textAlign={"center"}>Order Summary</Typography>
            </Grid>
            <Grid xs={12}>
              <Divider sx={{ mb: "5px" }} />
            </Grid>
            <Grid xs={6}>
              <Typography>Sub-total</Typography>
            </Grid>
            <Grid xs={6}>
              <Typography>{`HKD$${subTotal}`}</Typography>
            </Grid>
            <Grid xs={6}>
              <Typography>Shipping</Typography>
            </Grid>
            <Grid xs={6}>
              <Typography>FREE</Typography>
            </Grid> 
            <Grid xs={12}>
              <Divider sx={{ mb: "5px" }} />
            </Grid>
            <Grid xs={6}>
              <Typography>Total</Typography>
            </Grid>
            <Grid xs={6}>
              <Typography>{`HKD$${subTotal}`}</Typography>
            </Grid>
            <Grid xs={12}>
              <Divider/>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          {subTotal > 0 ? (
            <LinkButton color={undefined} href="/checkout" label="Check Out" />
          ) : (
            <Button disabled>Check Out</Button>
          )}
        </CardActions>
      </Card>
    </Container>
  );
}
export default MyCart;
