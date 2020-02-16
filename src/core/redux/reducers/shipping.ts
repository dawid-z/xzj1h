export default function reducer(state: any = {}, action: any) {
  return state;
}

export function getShippingMethods(): any {
  return (state: any) => {
    return state.shipping.methods.active;
  };
}
