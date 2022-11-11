import { configureStore } from "@reduxjs/toolkit";

import { authReducer, userReducer, orderReducer } from "./Reducer";

export const store = configureStore({
  reducer: {
    tokens: authReducer,
    user: userReducer,
    orders: orderReducer,
  },
});

store.subscribe(() => {
  console.log(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
