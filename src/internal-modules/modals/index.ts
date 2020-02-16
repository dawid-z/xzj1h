import React from "react";
import store, { addMiddleware } from "../../core/redux";
import { registerComponent } from "../../core";
import { ModalBox } from "./modal-box";
import modalMiddleware from "./modal-middleware";
import modalsReducer from "./reducer";

export function activate() {
  store.reducerManager.add("modal", modalsReducer);
  store.addMiddleware(modalMiddleware);

  registerComponent(ModalBox, {
    location: "Checkout:Main"
  });
}
