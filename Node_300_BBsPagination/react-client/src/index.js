import React from "react";
import ReactDOM from "react-dom/client";
import { BBSContextProvider } from "./context/BBsContext";
import "./css/index.css";
import MainRouterProvider from "./layout/MainRouter";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BBSContextProvider>
      <MainRouterProvider />
    </BBSContextProvider>
  </React.StrictMode>
);
