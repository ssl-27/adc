import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import ProductCartCard from "./ProductCartCard";
import { ReactElement, useContext, useEffect, useState } from "react";
import LinkButton from "../LinkButton";
import { UserContext } from "../../contexts/UserContext";
import RecommendationBar from "../RecommendationBar";

function MyCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartComponents, setCartComponents] = useState<ReactElement[]>([]);
  const [originalTotal, setOriginalTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);
  const { userInfo, syncInfo } = useContext(UserContext);
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
    syncInfo();
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
    syncInfo();
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
    if (userInfo?.tier !== 0) {
      setOriginalTotal(
        cart.reduce<number>(
          (prev, curr) =>
            prev + (curr?.originalPrice as number) * curr.quantity,
          0
        )
      );
    }
  }, [cart]);

  useEffect(() => {
    setDiscount(subTotal - originalTotal);
  }, [originalTotal, subTotal]);

  return (
    <Grid container justifyContent={"center"} gap={"30px"}>
      <Grid item>
        <Card>
          <CardContent>
            <Typography variant="h6" textAlign={"center"}>
              My Cart
            </Typography>
            <Divider sx={{ mb: "5px" }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                minWidth: "250px",
                minHeight: "200px",
              }}
            >
              {cartComponents.length === 0 ? (
                <Typography textAlign={"center"}>Cart is empty.</Typography>
              ) : (
                cartComponents
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <CardContent>
            <Grid container item width={"250px"}>
              <Grid item xs={12}>
                <Typography variant="h6" textAlign={"center"}>
                  Order Summary
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ mb: "5px" }} />
              </Grid>
              {userInfo?.tier !== 0 && cart.length > 0 && (
                <>
                  <Grid item xs={6}>
                    <Typography>Original Total</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{`HKD$${originalTotal}`}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Discount</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{`-HKD$${Math.abs(discount)}`}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ mb: "5px" }} />
                  </Grid>
                </>
              )}
              <Grid item xs={6}>
                <Typography>Sub-total</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{`HKD$${subTotal}`}</Typography>
              </Grid>
              {cart.length > 0 && (
                <>
                  <Grid item xs={6}>
                    <Typography>Shipping</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>FREE</Typography>
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Divider sx={{ mb: "5px" }} />
              </Grid>
              <Grid item xs={6}>
                <Typography>Total</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{`HKD$${subTotal}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            {subTotal > 0 ? (
              <LinkButton
                color={undefined}
                href="/checkout"
                label="Check Out"
              />
            ) : (
              <Button disabled>Check Out</Button>
            )}
          </CardActions>
        </Card>
      </Grid>
      <Grid xs={9} maxWidth={"250px"} item>
        <RecommendationBar title="You may also like:" />
      </Grid>
      <Grid xs={9} item>
        <RecommendationBar title="From your wish list:" />
      </Grid>
    </Grid>
  );
}
export default MyCart;
