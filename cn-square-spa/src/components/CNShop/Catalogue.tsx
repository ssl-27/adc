import { Box, Container, Pagination, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

function Catalogue() {
    return (
        <Container>
            <Box sx={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "20px", justifyContent:"center"}}>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
            </Box>
            <Box sx={{display: "flex", justifyContent:"center", mt:"10px"}}>
                <Pagination count={10} color="primary"></Pagination>
            </Box>
        </Container>
    );
}

export default Catalogue;