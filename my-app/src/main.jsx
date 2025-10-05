// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "../src/store";
// import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <AuthProvider>
    <Provider store={store}>
      <App />
    </Provider>
  // </AuthProvider>
);
