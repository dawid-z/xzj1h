import { ShippingList, AddressBox } from "./shipping-list";
import { registerComponent } from "../../core";
import store from "../../core/redux";
import reducer from "./reducer";
import Extensions from "../../core/registries/extension-registry";
import { CourierMethodExtension } from "./extensions/courier-method-extension";
import { StoreMethodExtension } from "./extensions/store-method-extension";
import { PickupMethodExtension } from "./extensions/pickup-method-extension";

export function activate() {
  store.reducerManager.add("shippings", reducer);
  Extensions.ShippingList.register(new CourierMethodExtension());
  Extensions.ShippingList.register(new StoreMethodExtension());
  Extensions.ShippingList.register(new PickupMethodExtension());

  registerComponent(ShippingList, {
    location: "Checkout:Main"
  });

  registerComponent(AddressBox, {
    role: "shipping-list-item-secondary"
  });
}
