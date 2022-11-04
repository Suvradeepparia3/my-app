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

export const initialState = {
  loading: false,
  token: undefined,
  error: undefined,
  userDetails: undefined,
  orders: undefined,
};

export const authReducer = (state = initialState, action: any) => {
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

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case USER_DETAILS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_ORDERS_CALL:
      return {
        ...state,
        loading: true,
      };
    case USER_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };
    case USER_ORDERS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
