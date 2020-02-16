import React from "react";
import store from "../../../core/redux";
import { Slot } from "../../../core/components/slot/slot";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";


export function CourierMethodDialog(props: any) {
  const formRef = React.createRef();

  return (
    <>
      <DialogTitle>Shipping address</DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off" ref={formRef}>
          <TextField name={"firstname"} label="First name" fullWidth />
          <TextField name={"lastname"} label="Last name" fullWidth />
          <TextField name={"email"} label="Email" fullWidth />
          <Slot
            matching={{ role: "shipping-address-hints" }}
            exposedProps={{ formRef }}
            fallback={() => (
              <>
                <TextField name={"city"} label="City" fullWidth />
                <TextField name={"street"} label="Street" fullWidth />
                <TextField name={"house"} label="House" fullWidth />
                <TextField name={"appartment"} label="Appartment" fullWidth />
              </>
            )}
          />
          <TextField
            name={"additional-info"}
            label="Additional information"
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.handleChange(formRef.current.elements);
          }}
          color="primary"
          variant="contained"
          fullWidth
        >
          OK
        </Button>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={props.handleClose}
        >
          Anuluj
        </Button>
      </DialogActions>
    </>
  );
}

export class CourierMethodExtension {
  name = "CourierMethodExtension";

  getSupportedMethods() {
    return ["couriermethod"];
  }

  async canChange() {
    if (store.getState().shippings?.shipping_address) {
      return Promise.resolve(true);
    }
    
    return new Promise(resolve => {
      store.dispatch({
        type: "SHOW_MODAL",
        payload: {
          handleChange(form: any) {
            store.dispatch({ type: "HIDE_MODAL" });
            const addressData = [...form]
              .map(input => ({
                name: input.name,
                value: input.value
              }))
              .reduce((a, { name, value }) => {
                a[name] = value;
                return a;
              }, {});

            const isValid = Object.entries(addressData).filter(
              entry => entry[1]
            ).length;

            if (isValid) {
              store.dispatch({
                type: "SET_SHIPPING_ADDRESS",
                payload: addressData
              });
              return resolve(true);
            }
            resolve(false);
          },

          handleClose() {
            store.dispatch({ type: "HIDE_MODAL" });
            resolve(false);
          },
          ModalBody: CourierMethodDialog
        }
      });
    });
  }
}
