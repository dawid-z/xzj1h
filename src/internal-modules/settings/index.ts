import { SettingsButton } from "./settings";
import { registerComponent } from "../../core";
import store from "../../core/redux";
import reducer from "./reducer";

export function activate() {
  store.reducerManager.add("settings_visible", reducer);

  registerComponent(SettingsButton, {
    location: "Page:Header",
    role: "action-button"
  });
}
