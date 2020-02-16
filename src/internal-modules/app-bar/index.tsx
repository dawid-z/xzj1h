import React from "react";
import { registerComponent } from "../../core";
import { Appbar } from "./app-bar";

export function activate() {
  registerComponent(Appbar, {
    location: "Page:Header"
  });
}
