import { Box, Container, Typography } from "@mui/material";
import Catalogue from "./Catalogue";
import ProductFilter from "./ProductFilter";

function CNShop() {
  return (
    <Container maxWidth="xl">
      <Typography>Shop</Typography>
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <ProductFilter></ProductFilter>
        <Catalogue></Catalogue>
      </Box>
    </Container>
  );
}

export default CNShop;
