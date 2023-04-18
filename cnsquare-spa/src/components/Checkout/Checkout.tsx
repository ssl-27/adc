import { useContext, useEffect, useState, Fragment } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import cnAxios from "../../utils/cn-axios";
import LinkButton from "../LinkButton";
import PaymentMethod from "./PaymentMethod";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © CN Square " + new Date().getFullYear() + "."}
    </Typography>
  );
}

const steps = [
  "Payment method",
  "Shipping address",
  "Payment details",
  "Review your order",
];

function getStepContent(step: number, userData: User, pointsUsedState) {
  const { pointsUsed, setPointsUsed } = pointsUsedState;
  switch (step) {
    case 0:
      return (
        <PaymentMethod pointsUsed={pointsUsed} setPointsUsed={setPointsUsed} />
      );
    case 1:
      return <AddressForm info={userData} />;
    case 2:
      return <PaymentForm info={userData} />;
    case 3:
      return <Review pointsUsed={pointsUsed} info={userData} />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

function Checkout() {
  const navigate = useNavigate();
  const { user, userInfo, syncInfo } = useContext(UserContext);
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
    if (activeStep == 4) {
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
      };
      cnAxios.post("/orders", orderPayload).then(() => {
        window.localStorage.setItem("cart", JSON.stringify([]));
        cnAxios.patch(`/users/${user.id}`, userPayload).then(() => {
          syncInfo();
        });
      });
    }
  }, [activeStep]);

  if (userInfo === null) {
    return <div></div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
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
    </ThemeProvider>
  );
}
export default Checkout;
