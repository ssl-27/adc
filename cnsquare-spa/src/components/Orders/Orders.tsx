import {
  Alert,
  Avatar,
  Box,
  Button,
  Collapse,
  Container,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import adcAxios from "../../utils/cn-axios";
import OrderCard from "./OrderCard";
import { UserContext } from "../../contexts/UserContext";

function Orders() {
  const [open, setOpen] = useState(true);
  const [orderIds, setOrderIds] = useState([]);

  const { user } = useContext(UserContext);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getOrderIds();
  }, []);

  const getOrderIds = () => {
    adcAxios
      .get(`/users/${user.id}/orders`)
      .then((res) => {
        const data = res.data;

        setOrderIds(
          data.map((el: any) => {
            return el.id;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom={true} sx={{ mt: 3 }}>
        My Orders
      </Typography>

      <List
        sx={{
          width: "100%",
          bgcolor: "#F0F0F0",
          borderRadius: 1,
          mt: 3,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {orderIds.map((id) => (
          <OrderCard key={id} orderId={id} />
        ))}
      </List>
    </Container>
  );
}

export default Orders;
