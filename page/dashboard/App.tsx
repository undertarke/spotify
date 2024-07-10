import React from "react";
import { createRoot } from "react-dom/client";
import Index from "./Index";
import { Provider } from "react-redux";
import dashboard from "./NaviRedux";

//@ts-ignore
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={dashboard}>
    <Index></Index>
  </Provider>
);
