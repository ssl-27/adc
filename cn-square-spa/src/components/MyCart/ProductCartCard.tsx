import {
  Box,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

function ProductCartCard() {
  const updateCount = (event) => {
    // TODO: update cart?
  };
  return (
    <Card>
      <CardContent sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <Box>
          <img src={"/sample.jpg"} loading="lazy" width="200px" />
          <Typography>Test item</Typography>
          <Typography>HK$10</Typography>
        </Box>
        <Box>
          <TextField
            sx={{ width: "100px" }}
            label="Quantity"
            type="number"
            InputProps={{ inputProps: { min: 1, max: 100 } }}
            defaultValue={"1"}
            onChange={updateCount}
          />
          <IconButton>
            <CancelIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCartCard;
