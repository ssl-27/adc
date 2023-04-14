import { Card, CardContent, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ProductInfo from "./ProductInfo";
import ReviewSection from "./ReviewSection";

function ProductDetail() {
  return (
    <Container>
      <Typography>
        <Link to="/shop" replace={true}>
          Back
        </Link>
      </Typography>
      <Card>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <ProductInfo />
          <ReviewSection />
        </CardContent>
      </Card>
    </Container>
  );
}
export default ProductDetail;
