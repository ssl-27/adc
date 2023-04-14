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

function ProductInfo(props) {
  const { info } = props;
  const { name, description, prices } = info;
  const updateCount = (event) => {
    // TODO: update cart?
  };
  return (
    <Card>
      <img src={"/sample.jpg"} loading="lazy" width="400px" />
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
          <Button>Add to Cart</Button>
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
