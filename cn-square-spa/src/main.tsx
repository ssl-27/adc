import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import CNShop from "./components/CNShop";
import MyCart from "./components/MyCart";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "shop",
        element: <CNShop />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "cart",
        element: <MyCart />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
