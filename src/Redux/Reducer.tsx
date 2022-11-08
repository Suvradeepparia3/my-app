import { OrderRes } from "../Modals/orderResModal";
import {
  CALL_FOR_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_ORDERS_CALL,
  USER_ORDERS_SUCCESS,
  USER_ORDERS_FAILURE,
} from "./Action";

interface authInitialStateProps {
  loading: boolean;
  token: undefined | string;
}

interface userInitialState {
  userDetails: any;
}

interface orderInitialState {
  loading: boolean;
  orders: OrderRes | undefined;
}

export const authInitialState: authInitialStateProps = {
  loading: true,
  token: undefined,
};
export const userInitialState: userInitialState = {
  userDetails: undefined,
};
export const orderInitialState: orderInitialState = {
  loading: true,
  orders: undefined,
};

export const authReducer = (state = authInitialState, action: any) => {
  switch (action.type) {
    case CALL_FOR_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
        error: undefined,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        token: undefined,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        token: undefined,
        error: undefined,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        token: undefined,
        error: undefined,
      };
    default:
      return state;
  }
};

export const userReducer = (state = userInitialState, action: any) => {
  switch (action.type) {
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case USER_DETAILS_FAILURE:
      return {
        ...state,
        userDetails: undefined,
      };
    default:
      return state;
  }
};

export const orderReducer = (state = orderInitialState, action: any) => {
  switch (action.type) {
    case USER_ORDERS_CALL:
      return {
        ...state,
        loading: true,
      };
    case USER_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case USER_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        orders: undefined,
      };
    default:
      return state;
  }
};
