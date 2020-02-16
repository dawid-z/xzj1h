import * as React from "react";
import { render } from "react-dom";
import App from "./App";
import * as AppBar from "./internal-modules/app-bar";
import * as Settings from "./internal-modules/settings";
import * as Shipping from "./internal-modules/shipping";
import * as Payment from "./internal-modules/payment";
import * as Modals from "./internal-modules/modals";
import store from "./core/redux";

const activate = (module: any) => {
  module.activate();
  return Promise.resolve(module);
};
const deactivate = (module: any) => void module.deactivate();
const silentFail = (err: any) => void console.error(err);

// init internal modules
activate(Settings);
activate(AppBar);
activate(Modals);
activate(Shipping);
activate(Payment);

if (false) {
  import("./lazy-modules/address-hints-provider")
    .then(activate)
    .catch(silentFail);
}
const rootElement = document.getElementById("root");
render(<App />, rootElement);
