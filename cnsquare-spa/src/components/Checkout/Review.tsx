import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

export default function Review(props) {
  const { info } = props;
  const {
    firstName,
    lastName,
    address,
    district,
    city,
    creditCardNumber,
    creditCardExpiryDate,
  } = info as User;
  const cart = JSON.parse(window.localStorage.getItem("cart") as string);
  const products = cart.map((v) => {
    return {
      name: v.name,
      price: parseFloat(v.price) * v.quantity,
    };
  }) as any[];
  products.push({ name: "Shipping", price: 0 });
  const addresses = [address, district, city];
  const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: `${firstName} ${lastName}` },
    {
      name: "Card number",
      detail: `${creditCardNumber.replace(/\d\d\d\d/, "XXXX")}`,
    },
    { name: "Expiry date", detail: creditCardExpiryDate },
  ];
  const total = products.reduce<number>((prev, curr) => prev + curr.price, 0);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={""} />
            <Typography variant="body2">{`$${product.price}`}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {`$${total}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
