import { Box, Pagination } from "@mui/material";
import ProductCard from "./ProductCard";

function Catalogue(props) {
  const { info } = props;
  const productCards = info.map((v) => {
    return (
      <ProductCard
        key={v.id}
        id={v.id}
        name={v.name}
        price={v.price}
        imageUrl={v.imageUrl}
      ></ProductCard>
    );
  });
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "flex-start",
        }}
      >
        {productCards}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "10px" }}>
        <Pagination count={10} color="primary"></Pagination>
      </Box>
    </Box>
  );
}

export default Catalogue;
