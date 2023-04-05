import { Card, Typography } from "@mui/material";

function ProductCard() {
    return (
        <Card>
            <img src={"/sample.jpg"} loading="lazy" width="200px"/>
            <Typography>Test item</Typography>
            <Typography>HK$10</Typography>
        </Card>
    );
}

export default ProductCard;