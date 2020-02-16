const initialState = { modal: {} };

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        ...action.payload,
        open: true
      };
    case "HIDE_MODAL":
      return initialState;
    default:
      return state;
  }
}

export const showModal = (modalProps: any) => ({
  payload: modalProps,
  type: "SHOW_MODAL"
});

export const hideModal = (modalResult: any) => ({
  modalResult,
  type: "HIDE_MODAL"
});
