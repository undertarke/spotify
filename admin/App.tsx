import React from "react";
import { createRoot } from "react-dom/client";
import Index from "./Index";
import Redux from "./Redux";
import { Provider } from "react-redux";
//@ts-ignore
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={Redux}>
    <Index />
  </Provider>
);
