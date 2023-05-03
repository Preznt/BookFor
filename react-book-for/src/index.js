import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./css/index.css";
import App from "./App";
import MainRouter from "./page/MainRouter";
import { BookContextProvider } from "./context/BookContext";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  // <React.StrictMode>
  <BookContextProvider>
    <RouterProvider router={MainRouter} />
  </BookContextProvider>
  // </React.StrictMode>
);
