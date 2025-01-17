import React from "react";
import ReactDOM from "react-dom/client"; // React 18 import
import "./index.css";
import App from "./App";

import store from "./redux/store"; // Store created with Redux Toolkit
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // Redux integration

const root = ReactDOM.createRoot(document.getElementById("root")); // Ensure the "root" div exists in index.html

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);