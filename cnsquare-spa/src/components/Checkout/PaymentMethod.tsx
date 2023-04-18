import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@mui/material";
import React from "react";
import { UserContext } from "../../contexts/UserContext";

function PaymentMethod(props) {
  const { userInfo } = React.useContext(UserContext);
  const { pointsUsed, setPointsUsed } = props;
  const googlePay = <img src="/google_pay.svg" height="60px" />;
  const applePay = (
    <Box marginLeft={"14px"}>
      <img src="/apple_pay.svg" height="40px" />
    </Box>
  );
  const cart = JSON.parse(
    window.localStorage.getItem("cart") as string
  ) as any[];
  const total = cart.reduce<number>(
    (prev, curr) => prev + curr.price * curr.quantity,
    0
  );
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl>
            <RadioGroup defaultValue="credit">
              <FormControlLabel
                value="credit"
                control={<Radio />}
                label="Credit Card"
              />
              <FormControlLabel
                value="google"
                disabled
                control={<Radio />}
                label={googlePay}
              />
              <FormControlLabel
                value="apple"
                disabled
                control={<Radio />}
                label={applePay}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {userInfo?.tier === 2 && (
          <>
            <Grid item xs={12}>
              <Typography variant="h6">Cash dollars</Typography>
              <Typography variant="subtitle2">
                Conversion rate: 10 points = HKD$1
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Use Points:</Typography>
              <Slider
                getAriaValueText={(v) => `${v} points`}
                valueLabelDisplay="auto"
                value={pointsUsed}
                min={0}
                max={Math.min(userInfo?.points as number, total * 10)}
                onChange={(event, value) => {
                  setPointsUsed(value);
                }}
              />
              <Typography>{`${pointsUsed} points = HKD$${
                pointsUsed / 10
              }`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">{`Amount charged = ${total} - ${
                pointsUsed / 10
              } = HKD$${Math.floor(total - pointsUsed / 10)}`}</Typography>
            </Grid>
          </>
        )}
      </Grid>
    </React.Fragment>
  );
}
export default PaymentMethod;
