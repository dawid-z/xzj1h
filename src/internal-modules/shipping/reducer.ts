export default function reducer(
  state = { selected: "", openShippingAddressDialog: false },
  action: any
) {
  if (action.type === "SET_SHIPPING_METHOD") {
    return {
      ...state,
      selected: action.payload
    };
  }

  if (action.type === "OPEN_SHIPPING_ADDRESS_DIALOG") {
    return {
      ...state,
      openShippingAddressDialog: action.payload
    };
  }

  if (action.type === "SET_SHIPPING_ADDRESS") {
    return {
      ...state,
      shipping_address: action.payload
    };
  }

  return state;
}
