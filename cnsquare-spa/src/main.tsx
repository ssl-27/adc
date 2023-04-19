import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Root from "./components/Root";
import CNShop from "./components/CNShop";
import MyCart from "./components/MyCart";
import ProductDetail from "./components/ProductDetail";
import cnAxios from "./utils/cn-axios";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { UserContextProvider } from "./contexts/UserContext";
import Checkout from "./components/Checkout";
import Profile from "./components/Profile";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
// import Orders from "./components/Orders";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "shop",
        element: <CNShop />,
        loader: async () => {
          const response = await cnAxios.get("/products");
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
      // {
      //   path: "orders",
      //   element: <Orders />,
      // },
      {
        path: "product/:id",
        element: <ProductDetail />,
        loader: async ({ params }) => {
          const productResponse = await cnAxios.get(`/products/${params.id}`);
          const reviewResponse = await cnAxios.get(
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
      main: "#4ebd88",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#bd4e83",
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
