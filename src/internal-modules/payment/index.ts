import { PaymentsList } from "./payments-list";
import { registerComponent } from "../../core";

export function activate() {
  registerComponent(
    PaymentsList,
    {
      location: "Checkout:Main"
    },
    {
      priority: 100
    }
  );
}
