import { Box, Container, Typography } from "@mui/material";
import Catalogue from "./Catalogue";
import ProductFilter from "./ProductFilter";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

function CNShop() {
  const data = useLoaderData() as Product[];
  // TODO: show different price tiers?
  const preprocess = (data: Product[]) => {
    return data.map((v) => {
      const { id, name, type, brand, imageUrl, popularity, prices } = v;
      const price = prices[0].price;
      return {
        id,
        name,
        type,
        brand,
        imageUrl,
        popularity,
        price,
      };
    });
  };
  const unfiltered = preprocess(data);
  const [previewInfo, setPreviewInfo] = useState(unfiltered);
  return (
    <Container maxWidth="xl">
      <Typography>Shop</Typography>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: "30px" }}>
        <ProductFilter
          info={unfiltered}
          setPreviewInfo={setPreviewInfo}
        ></ProductFilter>
        <Catalogue info={previewInfo}></Catalogue>
      </Box>
    </Container>
  );
}

export default CNShop;
