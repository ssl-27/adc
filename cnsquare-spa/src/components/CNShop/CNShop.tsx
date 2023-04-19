import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import Catalogue from "./Catalogue";
import ProductFilter from "./ProductFilter";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

function CNShop() {
  const data = useLoaderData() as Product[];
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const [previewInfo, setPreviewInfo] = useState<any[]>([]);
  const [unfiltered, setUnfiltered] = useState<any[]>([]);
  useEffect(() => {
    const tier = userInfo === null ? 0 : userInfo.tier;
    setUnfiltered(
      data.map((v) => {
        const {
          id,
          name,
          type,
          brand,
          imageUrl,
          popularity,
          prices,
          size,
          feature,
        } = v;
        const price = prices[tier].price;
        return {
          id,
          name,
          type,
          brand,
          imageUrl,
          popularity,
          price,
          originalPrice: tier !== 0 ? prices[0].price : undefined,
          size,
          feature,
        };
      })
    );
  }, [userInfo]);
  useEffect(() => {
    setPreviewInfo(unfiltered);
  }, [unfiltered]);
  return (
    <Container maxWidth="xl">
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
        <Typography color="text.primary">Shop</Typography>
      </Breadcrumbs>
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
