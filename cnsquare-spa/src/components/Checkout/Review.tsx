import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { LinearProgress } from "@mui/material";

export default function Review(props) {
  const { info, pointsUsed } = props;
  const {
    firstName,
    lastName,
    address,
    district,
    city,
    creditCardNumber,
    creditCardExpiryDate,
    points,
    tier,
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
  const total =
    products.reduce<number>((prev, curr) => prev + curr.price, 0) -
    pointsUsed / 10;
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
          <ListItemText primary="Minus: Cash Dollars" />
          <Typography variant="body2">{`$${pointsUsed / 10}`}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {`$${Math.floor(total)}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Points Gained</Typography>
          <List disablePadding>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Current Points" />
              <Typography variant="body2">{points}</Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Add: Points from purchase" />
              <Typography variant="body2">{Math.floor(total)}</Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Minus: points converted to cash dollars" />
              <Typography variant="body2">{pointsUsed}</Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Points Balance" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {`${Math.floor(points + total - pointsUsed)}`}
              </Typography>
            </ListItem>
          </List>
        </Grid>
        {tier !== 2 && (
          <>
            <Grid item xs={12}>
              {total + points > 1000 ? (
                <LinearProgress variant="buffer" value={100} valueBuffer={0} />
              ) : (
                <LinearProgress
                  variant="buffer"
                  value={points / 10}
                  valueBuffer={(points + total) / 10}
                />
              )}
            </Grid>
            <Grid item xs={12}>
              {total + points > 1000 ? (
                <Typography>Your membership will upgrade to VIP!</Typography>
              ) : (
                <Typography>{`You need ${Math.ceil(
                  1000 - total - points
                )} more points to upgrade to VIP!`}</Typography>
              )}
            </Grid>
          </>
        )}
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
