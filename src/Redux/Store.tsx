import { configureStore } from "@reduxjs/toolkit";
import { authReducer, userReducer, orderReducer } from "./Reducer";

export const store = configureStore({
  reducer: {
    tokens: authReducer,
    user: userReducer,
    orders: orderReducer,
  },
});

//export const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => {
  console.log(store.getState());
});
