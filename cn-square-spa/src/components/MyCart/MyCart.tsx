import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import ProductCartCard from "./ProductCartCard";

function MyCart() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "5px",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h6">My Cart</Typography>
          <Divider sx={{ mb: "5px" }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <ProductCartCard />
            <ProductCartCard />
            <ProductCartCard />
          </Box>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6">Order Summary</Typography>
          <Divider sx={{ mb: "5px" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>Sub-total</Typography>
            <Typography>$30</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>Shipping</Typography>
            <Typography>FREE</Typography>
          </Box>
          <Divider sx={{ mb: "5px" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>Total</Typography>
            <Typography>$30</Typography>
          </Box>
          <Divider />
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button>Check Out</Button>
        </CardActions>
      </Card>
    </Container>
  );
}
export default MyCart;
