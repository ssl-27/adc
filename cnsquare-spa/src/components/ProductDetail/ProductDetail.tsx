import { Card, CardContent, Container, Typography } from "@mui/material";
import { Link, useLoaderData } from "react-router-dom";
import ProductInfo from "./ProductInfo";
import ReviewSection from "./ReviewSection";

function ProductDetail() {
  const [productData, reviewData] = useLoaderData() as [Product, Comment[]];
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
          <ProductInfo info={productData} />
          <ReviewSection reviews={reviewData} productId={productData.id} />
        </CardContent>
      </Card>
    </Container>
  );
}
export default ProductDetail;
