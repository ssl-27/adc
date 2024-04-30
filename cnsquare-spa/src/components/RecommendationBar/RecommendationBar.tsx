import { useContext, useEffect, useState } from "react";
import adcAxios from "../../utils/cn-axios";
import ProductCard from "../CNShop/ProductCard";
import { UserContext } from "../../contexts/UserContext";
import { Card, CardContent, Grid, Typography } from "@mui/material";

function RecommendationBar(props) {
  const { title } = props;
  const [products, setProducts] = useState<any[]>([]);
  const { userInfo } = useContext(UserContext);
  const userTier = userInfo === null ? 0 : userInfo.tier;
  const preprocess = (data: Product[]) => {
    return data.map((v) => {
      const { id, name, type, brand, imageUrl, popularity, prices, feature } =
        v;
      const price = prices[userTier].price;
      return {
        id,
        name,
        type,
        brand,
        imageUrl,
        popularity,
        price,
        originalPrice: userTier !== 0 ? prices[0].price : undefined,
        feature,
      };
    });
  };

  useEffect(() => {
    adcAxios
      .get("products?_limit=5")
      .then((res) => setProducts(preprocess(res.data) as any[]));
  }, []);

  // TODO: refactor
  const productCards = products.map((v) => (
    <Grid key={`${title}-${v.id}`} margin={"5px"}>
      <ProductCard info={v} />
    </Grid>
  ));

  return (
    <Card>
      <CardContent>
        <Grid container justifyContent={"space-evenly"}>
          <Grid xs={12}>
            <Typography>{title}</Typography>
          </Grid>
          {productCards}
        </Grid>
      </CardContent>
    </Card>
  );
}
export default RecommendationBar;
