import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  Card,
  CardActionArea,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import adcAxios from "../../utils/cn-axios";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import Check from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { create } from "@mui/material/styles/createTransitions";
import { UserContext } from "../../contexts/UserContext";

function OrderCard(props: any) {
  const [open, setOpen] = useState(true);

  const { user, userInfo } = useContext(UserContext);

  const [orderId, setOrderId] = useState(0);
  const [items, setItems] = useState([
    {
      productId: 0,
      quantity: 0,
    },
  ]);

  const [status, setStatus] = useState(0);
  const [location, setLocation] = useState(["", ""]);

  const [createdAt, setCreatedAt] = useState("");

  const [products, setProducts] = useState<any[]>([]);

  const [total, setTotal] = useState(0);

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    getOrder();
    getProducts();
  }, []);

  const getOrder = () => {
    adcAxios
      .get(`/orders/${props.orderId}`)
      .then((res) => {
        const data = res.data;

        setOrderId(data.id);
        setItems(data.items);
        setStatus(data.status);
        setLocation(data.location);
        setCreatedAt(data.createdAt);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProducts = () => {
    adcAxios
      .get("/products")
      .then((res) => {
        const data = res.data;
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setHasLoaded(true);
    }, 1500);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#784af4",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#784af4",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
      color:
        theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
      display: "flex",
      height: 22,
      alignItems: "center",
      ...(ownerState.active && {
        color: "#784af4",
      }),
      "& .QontoStepIcon-completedIcon": {
        color: "#784af4",
        zIndex: 1,
        fontSize: 18,
      },
      "& .QontoStepIcon-circle": {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "currentColor",
      },
    })
  );

  function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }

  const steps = ["Preparing",  "Fulfilled"];

  //   const rows = items.map(async (item) => {
  //     const res = await adcAxios.get(`/products/${item.productId}`);
  //     console.log(res.data)
  //   })

  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary={`Order #${props.orderId}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Card sx={{ minHeight: 300 }}>
          <Typography sx={{ ml: 2, mt: 2 }}>
            Order Placed | {new Date(createdAt).toUTCString()}
          </Typography>
          <Stepper
            alternativeLabel
            activeStep={status + 1}
            sx={{ mt: 3, mb: 3 }}
            connector={<QontoConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <TableContainer
            component={Paper}
            sx={{ mt: 3, display: "flex", justifyContent: "center" }}
          >
            <Table sx={{ maxWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hasLoaded
                  ? items.map((row: any) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.productId}
                        </TableCell>
                        <TableCell align="right">
                          {
                            products?.find((o: any) => o.id == row.productId)
                              ?.name
                          }
                        </TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">
                          {(products?.find((o: any) => o.id == row.productId)
                            ?.prices[userInfo?.tier ?? 0]?.price * row.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))
                  : ""}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Collapse>
    </div>
  );
}

export default OrderCard;
