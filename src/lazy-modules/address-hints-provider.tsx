import React, { Fragment } from "react";
import { registerComponent, unregisterComponent } from "../core";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

function FormFields() {
  return (
    <Fragment>
      <FormControl fullWidth defaultValue={""}>
        <InputLabel id="shipping-address-city">City</InputLabel>
        <Select name={"city"} labelId="shipping-address-city" defaultValue={""}>
          <MenuItem value={10}>Poznań</MenuItem>
          <MenuItem value={20}>Warszawa</MenuItem>
          <MenuItem value={30}>Gdańsk</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth defaultValue={""}>
        <InputLabel id="shipping-address-street">Street</InputLabel>
        <Select
          name={"street"}
          labelId="shipping-address-street"
          defaultValue={""}
        >
          <MenuItem value={10}>Łąkowa</MenuItem>
          <MenuItem value={20}>Ogrodowa</MenuItem>
          <MenuItem value={30}>Powstańców Warszawskich</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth defaultValue={""}>
        <InputLabel id="shipping-address-house">House</InputLabel>
        <Select
          name={"house"}
          labelId="shipping-address-house"
          defaultValue={""}
        >
          <MenuItem value={10}>1</MenuItem>
          <MenuItem value={20}>2</MenuItem>
          <MenuItem value={30}>3</MenuItem>
        </Select>
      </FormControl>
    </Fragment>
  );
}

export function activate() {
  registerComponent(FormFields, {
    role: "shipping-address-hints"
  });
}

export function deactivate() {
  unregisterComponent(FormFields);
}
