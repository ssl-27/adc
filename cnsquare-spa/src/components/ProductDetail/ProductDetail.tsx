import {
  Link,
  Breadcrumbs,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import ProductInfo from "./ProductInfo";
import ReviewSection from "./ReviewSection";
import RecommendationBar from "../RecommendationBar";

function ProductDetail() {
  const navigate = useNavigate();
  const [productData, reviewData] = useLoaderData() as [Product, Comment[]];
  return (
    <Container>
      <Breadcrumbs>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => {
            navigate("/");
          }}
          sx={{ cursor: "pointer" }}
        >
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => {
            navigate("/shop");
          }}
          sx={{ cursor: "pointer" }}
        >
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
          {/* <ReviewSection reviews={reviewData} productId={productData.id} /> */}
          <RecommendationBar title={"You may also like: "} />
          <RecommendationBar title={"From your wish list: "} />
        </CardContent>
      </Card>
    </Container>
  );
}
export default ProductDetail;
