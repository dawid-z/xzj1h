export default function reducer(state: any = null, action: any) {
  if (action.type === "TOGGLE_REGION_VISIBLE") {
    return {
      ...state,
      regions_visible: action.payload
    };
  }

  if (action.type === "TOGGLE_HINTS") {
    return {
      ...state,
      address_hints: action.payload
    };
  }

  return state;
}
