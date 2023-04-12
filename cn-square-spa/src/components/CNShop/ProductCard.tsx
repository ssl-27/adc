import {
  Box,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";

function ProductCard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Card onClick={handleOpen} sx={{ cursor: "pointer" }}>
        <img src={"/sample.jpg"} loading="lazy" width="200px" />
        <CardContent>
          <Typography>Test item</Typography>
          <Typography>HK$10</Typography>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose} maxWidth={"lg"}>
        <DialogTitle>Test item</DialogTitle>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <img src={"/sample.jpg"} loading="lazy" />
          <Box>
            <Typography>HK$10</Typography>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}

export default ProductCard;
