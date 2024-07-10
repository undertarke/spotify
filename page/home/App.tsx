import React from "react";
import { createRoot } from "react-dom/client";
import Index from "./Index";
import { Provider } from "react-redux";
import rootHome from "./RootRedux";
import "../../public/css/Share.css"
//@ts-ignore
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={rootHome}>
    <Index />
  </Provider>
);
