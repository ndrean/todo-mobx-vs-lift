import React from "react";
import ReactDOM from "react-dom";

import AppV1Mobx from "./AppV1Mobx";
import AppV3PropLift from "./AppV3PropLift";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <AppV1Mobx />
    <AppV3PropLift />
  </React.StrictMode>,
  rootElement
);
