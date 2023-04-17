import {
  Link,
  Breadcrumbs,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import ProductInfo from "./ProductInfo";
import ReviewSection from "./ReviewSection";
import RecommendationBar from "../RecommendationBar";

function ProductDetail() {
  const [productData, reviewData] = useLoaderData() as [Product, Comment[]];
  return (
    <Container>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/shop">
          Shop
        </Link>
        <Typography color="text.primary">{productData.name}</Typography>
      </Breadcrumbs>
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
          <RecommendationBar title={"You may also like: "} />
          <RecommendationBar title={"From your wish list: "} />
        </CardContent>
      </Card>
    </Container>
  );
}
export default ProductDetail;
