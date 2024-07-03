import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import {FormBuilderContext} from "./hooks/FormBuilderContext.jsx";
import {Toaster} from "./components/ui/toaster.jsx";
import {AppContext} from "./hooks/AppContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FormBuilderContext>
      <AppContext>
        <App />
        <Toaster />
      </AppContext>
    </FormBuilderContext>
  </BrowserRouter>
);
