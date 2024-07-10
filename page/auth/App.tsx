import React from "react";
import { createRoot } from "react-dom/client";
import Index from "./Index";
import { Provider } from "react-redux";
import rootAuth from "./RootAuth";

//@ts-ignore
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={rootAuth}>
    <Index />
  </Provider>
);
