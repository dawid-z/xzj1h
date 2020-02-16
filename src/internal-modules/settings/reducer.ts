export default function reducer(state = true, action: any) {
  if (action.type === "TOGGLE_SETTINGS_PANEL") {
    return action.payload;
  }
  return state;
}
