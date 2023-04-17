import { Card, CardContent, Rating, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProductCard(props) {
  const navigate = useNavigate();
  const { info } = props;
  const { id, name, price, imageUrl, brand, popularity, originalPrice } = info;
  const handleOpen = () => {
    window.scrollTo(0, 0);
    navigate(`/product/${id}`);
  };
  return (
    <div>
      <Card onClick={handleOpen} sx={{ cursor: "pointer", maxWidth: "200px" }}>
        <img src={imageUrl} loading="lazy" width="200px" />
        <CardContent>
          <Typography fontWeight={"bold"}>{brand}</Typography>
          <Typography>{name}</Typography>
          <Rating name="size-medium" defaultValue={popularity} readOnly />
          {originalPrice !== undefined && (
            <Typography
              sx={{ textDecoration: "line-through", fontSize: "12px" }}
            >
              HK${originalPrice}
            </Typography>
          )}
          <Typography>HK${price}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductCard;
