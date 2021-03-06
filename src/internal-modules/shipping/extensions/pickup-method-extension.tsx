import React from "react";
import store from "../../../core/redux";
import { Slot } from "../../../core/components/slot/slot";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

function ModalBody(props: any) {
  return (
    <>
      <DialogTitle>Paczkomaty</DialogTitle>
      <DialogContent>
        <Typography>wybierz paczkomat i podaj dane do odbioru</Typography>
        <Slot matching={{ role: "example-pickup-form-slot" }} />
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={props.handleChange}
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

export class PickupMethodExtension {
  name = "PickupMethodExtension";

  getSupportedMethods() {
    return ["inpostpp"];
  }

  canChange() {
    return new Promise(resolve => {
      store.dispatch({
        type: "SHOW_MODAL",
        payload: {
          handleChange() {
            store.dispatch({ type: "HIDE_MODAL" });
            resolve(true);
          },
          handleClose() {
            store.dispatch({ type: "HIDE_MODAL" });
            resolve(false);
          },
          ModalBody
        }
      });
    });
  }
}
