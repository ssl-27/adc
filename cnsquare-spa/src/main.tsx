import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import CNShop from "./components/CNShop";
import MyCart from "./components/MyCart";
import ProductDetail from "./components/ProductDetail";
import cnAxios from "./utils/cn-axios";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

const router = createBrowserRouter([
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
