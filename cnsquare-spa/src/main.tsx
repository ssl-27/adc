import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Root from "./components/Root";
import CNShop from "./components/CNShop";
import MyCart from "./components/MyCart";
import ProductDetail from "./components/ProductDetail";
import adcAxios from "./utils/cn-axios";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { UserContextProvider } from "./contexts/UserContext";
import Checkout from "./components/Checkout";
import Profile from "./components/Profile";
import Orders from "./components/Orders";
import Home from "./components/Home";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import TableReserve from "./components/TableReserve";
import ReservationQRCode from "./components/TableReserve/ReservationQRCode";
import TableStatusPage from "./components/TableAdmin";
import OrderSummaryPage from "./components/Admin/OrderSummary";
import AdminDashboardPage from "./components/Admin/AdminDashBoradPage";
import QRScannerPage from "./components/TableAdmin/SeatingScanner";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "shop",
        element: <CNShop />,
        loader: async () => {
          const response = await adcAxios.get("/products");
          return response.data;
        },
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "cart",
        element: <MyCart />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "tableReserve",
        element: <TableReserve />,
      },
      {
        path: "reservationCode",
        element: <ReservationQRCode />,
      },      
      {
        path: "tableStatus",
        element:<TableStatusPage />,
      },
      {
        path: "orderStatus",
        element: <OrderSummaryPage />,
      },
      {
        path: "admin",
        element: <AdminDashboardPage/>,
      },
      {
        path: "scan-queue-qr-code",
        element: <QRScannerPage/>,
      },
      
      {
        path: "product/:id",
        element: <ProductDetail />,
        loader: async ({ params }) => {
          const productResponse = await adcAxios.get(`/products/${params.id}`);
          const reviewResponse = await adcAxios.get(
            `/products/${params.id}/reviews`
          );
          return [productResponse.data, reviewResponse.data];
        },
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
]);

const theme = createTheme({
  palette: {
    primary: {
      main: "#dbc810",
      contrastText: "#000000",
    },
    secondary: {
      main: "#cc0000",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserContextProvider>
  </React.StrictMode>
);
