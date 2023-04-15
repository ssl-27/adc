import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

function ProductInfo(props) {
  const { info } = props;
  const { id, name, description, prices, imageUrl } = info;
  const [quantity, setQuantity] = useState(1);
  const updateCount = (event) => {
    setQuantity(event.target.value);
  };
  const updateCart = (event) => {
    const cartItem: CartItem = {
      id: id,
      name: name,
      imageUrl: imageUrl,
      price: prices[0].price, // TODO: determine price
      quantity: quantity,
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
  };
  return (
    <Card>
      <img src={imageUrl} loading="lazy" width="400px" />
      <CardContent>
        <Typography>{name}</Typography>
        <List subheader={<ListSubheader>Prices</ListSubheader>}>
          <ListItem>
            <ListItemText primary={`normal user: HKD$${prices[0].price}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`vip: HKD$${prices[1].price}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`vipp: HKD$${prices[2].price}`} />
          </ListItem>
        </List>
        <Box>
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
        <Divider textAlign={"left"}>
          <Typography>Product Info</Typography>
        </Divider>
        <Typography>{description}</Typography>
        <Divider textAlign={"left"}>
          <Typography>Return & Refund policy</Typography>
        </Divider>
        <Typography>No refunds.</Typography>
        <Divider textAlign={"left"}>
          <Typography>Shipping Info</Typography>
        </Divider>
        <Typography>Free shipping.</Typography>
      </CardContent>
    </Card>
  );
}
export default ProductInfo;
