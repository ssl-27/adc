import { useContext, useEffect, useState, Fragment } from "react";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import adcAxios from "../../utils/cn-axios";
import LinkButton from "../LinkButton";
import PaymentMethod from "./PaymentMethod";
import {
  Typography,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
} from "@mui/material";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © Australia Dairy Company " + new Date().getFullYear() + "."}
    </Typography>
  );
}

const steps = [
  "Payment method",
  "Payment details",
  "Review your order",
];

function getStepContent(step: number, userData: User, pointsUsedState: any) {
  const { pointsUsed, setPointsUsed } = pointsUsedState;
  switch (step) {
    case 0:
      return (
        <PaymentMethod pointsUsed={pointsUsed} setPointsUsed={setPointsUsed} />
      );
    // case 1:
    //   return <AddressForm info={userData} />;
    case 1:
      return <PaymentForm info={userData} />;
    case 2:
      return <Review pointsUsed={pointsUsed} info={userData} />;
    default:
      throw new Error("Unknown step");
  }
}

function Checkout() {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState<number>(0);
  const { user, userInfo, setCartInfo, setUserInfo } = useContext(UserContext);
  const [pointsUsed, setPointsUsed] = useState<number>(0);
  const cart = JSON.parse(
    window.localStorage.getItem("cart") as string
  ) as any[];
  useEffect(() => {
    if (user.id === null) {
      navigate("/login");
    } else {
      if (cart.length === 0) {
        navigate("/cart");
      }
    }
  }, []);
  // From template:
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // create new order
  useEffect(() => {
    if (activeStep == 3) {
      const items = cart.map((v) => {
        return {
          productId: parseInt(v.id),
          quantity: parseInt(v.quantity),
        };
      });
      const newPoints =
        cart.reduce<number>(
          (prev, curr) => prev + curr.price * curr.quantity,
          0
        ) +
        (userInfo?.points as number) -
        pointsUsed -
        pointsUsed / 10;
      const userPayload = {
        userId: parseInt(user.id as string),
        points: Math.floor(newPoints),
        tier: newPoints > 1000 && userInfo?.tier === 0 ? 2 : userInfo?.tier,
      };
      const orderPayload = {
        userId: parseInt(user.id as string),
        items: items,
        parcelLocation: ["22.3448", "114.0747"],
        status: 0,
        createdAt: new Date().toISOString(),
      };
      adcAxios.post("/orders", orderPayload).then((r) => {
        setOrderId(r.data.id);
        window.localStorage.setItem("cart", JSON.stringify([]));
        adcAxios.patch(`/users/${user.id}`, userPayload).then((res) => {
          setCartInfo([]);
          setUserInfo(res.data);
        });
      });
    }
  }, [activeStep]);

  if (userInfo === null) {
    return <div></div>;
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Fragment>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #{orderId}. 
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <LinkButton color="primary" href="/" label="home" />
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            {getStepContent(activeStep, userInfo as User, {
              pointsUsed,
              setPointsUsed,
            })}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Place order" : "Next"}
              </Button>
            </Box>
          </Fragment>
        )}
      </Paper>
      <Copyright />
    </Container>
  );
}
export default Checkout;
