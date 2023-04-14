import { Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function ProductCard(props) {
  const { id, name, price } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <div>
      {open && <Navigate to={`/product/${id}`} replace={true} />}
      <Card onClick={handleOpen} sx={{ cursor: "pointer", maxWidth: "200px" }}>
        <img src={"/sample.jpg"} loading="lazy" width="200px" />
        <CardContent>
          <Typography>{name}</Typography>
          <Typography>HK${price}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductCard;
