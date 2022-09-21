import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppcontextProvider } from "./context/Appcontext";
import {ChakraProvider } from "@chakra-ui/react"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChakraProvider>
      <AppcontextProvider>
        <App />
      </AppcontextProvider>
    </ChakraProvider>
  </BrowserRouter>
);
