import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

function ProductInfo(props) {
  const { info } = props;
  const { id, name, description, prices, imageUrl, brand } = info;
  const [quantity, setQuantity] = useState(1);
  const { userInfo, syncInfo } = useContext(UserContext);
  const updateCount = (event) => {
    setQuantity(event.target.value);
  };
  const updateCart = useCallback(
    (event) => {
      const tier = userInfo === null ? 0 : userInfo.tier;
      const cartItem: CartItem = {
        id: id,
        name: name,
        imageUrl: imageUrl,
        price: prices[tier].price,
        quantity: quantity,
        originalPrice: tier !== 0 ? prices[0].price : undefined,
        brand: brand,
      };
      const storedCart = JSON.parse(
        window.localStorage.getItem("cart") as string
      ) as CartItem[] | null;
      if (storedCart !== null) {
        const index = storedCart.findIndex((value) => value.id === cartItem.id);
        if (index !== -1) {
          storedCart[index] = cartItem;
        } else {
          storedCart.push(cartItem);
        }
        window.localStorage.setItem("cart", JSON.stringify(storedCart));
      } else {
        window.localStorage.setItem("cart", JSON.stringify([cartItem]));
      }
      syncInfo();
    },
    [quantity]
  );
  return (
    <Card>
      <CardContent>
        <Grid container rowGap={2} columnGap={4} justifyContent={"center"}>
          <Grid xs={12} container justifyContent={"center"}>
            <img src={imageUrl} loading="lazy" />
          </Grid>
          <Grid xs={12}>
            <Typography variant="h4" textAlign={"center"}>
              {name}
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Divider textAlign={"left"} sx={{ m: "5px" }}>
              <Typography>Product Info</Typography>
            </Divider>
            <Typography>{description}</Typography>
            <Divider textAlign={"left"} sx={{ m: "5px" }}>
              <Typography>Return & Refund policy</Typography>
            </Divider>
            <Typography>No refunds.</Typography>
            <Divider textAlign={"left"} sx={{ m: "5px" }}>
              <Typography>Shipping Info</Typography>
            </Divider>
            <Typography>Free shipping.</Typography>
          </Grid>
          <Grid xs={4}>
            <List subheader={<ListSubheader>Prices</ListSubheader>}>
              <ListItem>
                <ListItemText primary={`member: HKD$${prices[0].price}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`student: HKD$${prices[1].price}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`vip: HKD$${prices[2].price}`} />
              </ListItem>
            </List>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <TextField
                sx={{ width: "100px" }}
                label="Quantity"
                type="number"
                InputProps={{ inputProps: { min: 1, max: 100 } }}
                defaultValue={"1"}
                onChange={updateCount}
              />
              <Button onClick={updateCart}>Add to Cart</Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
export default ProductInfo;
