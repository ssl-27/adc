import {
  Badge,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProductCard(props) {
  const navigate = useNavigate();
  const { info } = props;
  const {
    id,
    name,
    price,
    imageUrl,
    brand,
    popularity,
    originalPrice,
    feature,
  } = info;
  const handleOpen = () => {
    window.scrollTo(0, 0);
    navigate(`/product/${id}`);
  };
  const badgeText =
    feature === "" ? undefined : (
      <Typography fontSize={"12px"} fontWeight={"bold"}>
        {feature}
      </Typography>
    );
  return (
    <div>
      <Badge badgeContent={badgeText} color="secondary">
        <Card
          onClick={handleOpen}
          sx={{ cursor: "pointer", maxWidth: "200px" }}
        >
          <CardMedia component="img" width="200x" image={imageUrl} />
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
            {originalPrice !== undefined ? (
              <Typography sx={{ color: "#FF0000" }}>HK${price}</Typography>
            ) : (
              <Typography>HK${price}</Typography>
            )}
          </CardContent>
        </Card>
      </Badge>
    </div>
  );
}

export default ProductCard;
