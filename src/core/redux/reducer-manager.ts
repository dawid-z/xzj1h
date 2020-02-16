import { combineReducers } from "redux";

export function createReducerManager(initialReducers: any) {
  const reducers = { ...initialReducers };
  let combinedReducer = combineReducers<any, any>(reducers);
  let keysToRemove = [] as any[];

  return {
    getReducerMap: () => reducers,

    reduce: (state: any, action: any) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (let key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }

      return combinedReducer(state, action);
    },

    add: (key: any, reducer: any) => {
      if (!key || reducers[key]) {
        return;
      }

      reducers[key] = reducer;
      combinedReducer = combineReducers<any, any>(reducers);
    },

    remove: (key: any) => {
      if (!key || !reducers[key]) {
        return;
      }

      delete reducers[key];
      keysToRemove.push(key);
      combinedReducer = combineReducers<any, any>(reducers);
    }
  };
}
