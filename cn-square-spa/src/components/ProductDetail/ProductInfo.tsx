import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";

function ProductInfo() {
  const updateCount = (event) => {
    // TODO: update cart?
  };
  return (
    <Card>
      <img src={"/sample.jpg"} loading="lazy" width="400px" />
      <CardContent>
        <Typography>Test item</Typography>
        <Box>
          <TextField
            sx={{ width: "100px" }}
            label="Quantity"
            type="number"
            InputProps={{ inputProps: { min: 1, max: 100 } }}
            defaultValue={"1"}
            onChange={updateCount}
          />
          <Button>Add to Cart</Button>
        </Box>
        <Divider textAlign={"left"}>
          <Typography>Product Info</Typography>
        </Divider>
        <Typography>
          Lorem ipsum dolor sit amet. Et architecto reprehenderit sit internos
          laborum et sapiente voluptatibus et maxime asperiores ut voluptatem
          fuga. Quo sunt harum ut laboriosam laborum est cupiditate accusantium
          ut dolores dolores. Sit voluptas ipsum sed similique quam quo
          consectetur corrupti et esse possimus! Est assumenda tempore est
          inventore suscipit At dolor voluptatibus.
        </Typography>
        <Divider textAlign={"left"}>
          <Typography>Return & Refund policy</Typography>
        </Divider>
        <Typography>
          Lorem ipsum dolor sit amet. Et architecto reprehenderit sit internos
          laborum et sapiente voluptatibus et maxime asperiores ut voluptatem
          fuga. Quo sunt harum ut laboriosam laborum est cupiditate accusantium
          ut dolores dolores. Sit voluptas ipsum sed similique quam quo
          consectetur corrupti et esse possimus! Est assumenda tempore est
          inventore suscipit At dolor voluptatibus.
        </Typography>
        <Divider textAlign={"left"}>
          <Typography>Shipping Info</Typography>
        </Divider>
        <Typography>
          Lorem ipsum dolor sit amet. Et architecto reprehenderit sit internos
          laborum et sapiente voluptatibus et maxime asperiores ut voluptatem
          fuga. Quo sunt harum ut laboriosam laborum est cupiditate accusantium
          ut dolores dolores. Sit voluptas ipsum sed similique quam quo
          consectetur corrupti et esse possimus! Est assumenda tempore est
          inventore suscipit At dolor voluptatibus.
        </Typography>
      </CardContent>
    </Card>
  );
}
export default ProductInfo;
