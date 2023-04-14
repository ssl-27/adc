import { Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function ProductCard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <div>
      {open && <Navigate to="/product/1" replace={true} />}
      <Card onClick={handleOpen} sx={{ cursor: "pointer" }}>
        <img src={"/sample.jpg"} loading="lazy" width="200px" />
        <CardContent>
          <Typography>Test item</Typography>
          <Typography>HK$10</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductCard;
