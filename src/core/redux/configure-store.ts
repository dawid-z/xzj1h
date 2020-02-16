import { createStore, Action, Store, compose } from "redux";
import { createReducerManager } from "./reducer-manager";
import shippingReducer from "./reducers/shipping";
import paymentReducer from "./reducers/payments";
import customerDataReducer from "./reducers/customer-data";
import addressDataReducer from "./reducers/address-data";
import invoiceDataReducer from "./reducers/invoice-data";
import configReducer from "./reducers/config";

const staticReducers = {
  shipping: shippingReducer,
  payments: paymentReducer,
  customer_data: customerDataReducer,
  address_data: addressDataReducer,
  invoice_data: invoiceDataReducer,
  config: configReducer
};

export function configureStore(initialState: any): Store<any> {
  const reducerManager = createReducerManager(staticReducers);
  const store = createStore<
    { shipping: any },
    Action<any>,
    { reducerManager: any; addMiddleware: any },
    any
  >(reducerManager.reduce, initialState);

  store.reducerManager = reducerManager;
  store.addMiddleware = (middleware: any) => {
    const api = {
      ...store,
      dispatch: (action: any) => store.dispatch(action)
    };

    store.dispatch = compose(middleware(api))(store.dispatch);
  };

  return store;
}
