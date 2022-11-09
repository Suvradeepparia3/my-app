import { OrderRes } from "../Modals/orderResModal";
import { ActionTypes } from "./Action";

interface authInitialStateProps {
  loading: boolean;
  token: undefined | string;
  error: undefined;
}

interface userInitialStateProps {
  userDetails: any;
}

interface orderInitialStateProps {
  loading: boolean;
  orders: OrderRes | undefined;
}

interface actionProps {
  type: string;
  payload?: any;
}

export const authInitialState: authInitialStateProps = {
  loading: false,
  token: undefined,
  error: undefined,
};
export const userInitialState: userInitialStateProps = {
  userDetails: undefined,
};
export const orderInitialState: orderInitialStateProps = {
  loading: true,
  orders: undefined,
};

export const authReducer = (state = authInitialState, action: actionProps) => {
  switch (action.type) {
    case ActionTypes.CALL_FOR_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
        error: undefined,
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        token: undefined,
        error: action.payload,
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        token: undefined,
        error: undefined,
      };
    case ActionTypes.LOGOUT_FAILURE:
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

export const userReducer = (state = userInitialState, action: actionProps) => {
  switch (action.type) {
    case ActionTypes.USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case ActionTypes.USER_DETAILS_FAILURE:
      return {
        ...state,
        userDetails: undefined,
      };
    default:
      return state;
  }
};

export const orderReducer = (
  state = orderInitialState,
  action: actionProps
) => {
  switch (action.type) {
    case ActionTypes.USER_ORDERS_CALL:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.USER_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case ActionTypes.USER_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        orders: undefined,
      };
    default:
      return state;
  }
};
