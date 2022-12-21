import axios from "axios";
import { LoginModal } from "../Modals/loginModal";
import { OrderFilter, OrderRes } from "../Modals/orderResModal";
import { UserDetails } from "../Modals/userDetailsModal";
import { orderDetails } from "../Services/orderService";
import { userDetails } from "../Services/userService";
import { AppDispatch } from "./Store";

export enum ActionTypes {
  CALL_FOR_LOGIN = "CALL_FOR_LOGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",

  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  LOGOUT_FAILURE = "LOGOUT_FAILURE",

  USER_DETAILS_SUCCESS = "USER_DETAILS_SUCCESS",
  USER_DETAILS_FAILURE = "USER_DETAILS_FAILURE",

  USER_ORDERS_CALL = "USER_ORDERS_CALL",
  USER_ORDERS_SUCCESS = "USER_ORDERS_SUCCESS",
  USER_ORDERS_FAILURE = "USER_ORDERS_FAILURE",
}

// LOGIN
export const callForLogin = () => {
  return {
    type: ActionTypes.CALL_FOR_LOGIN,
  };
};

export const loginSuccess = (userDetails: UserDetails) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: userDetails,
  };
};

export const loginFailure = (error: string | undefined) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    payload: error,
  };
};

export const logInSubmit = (cred: LoginModal) => {
  return function (dispatch: AppDispatch) {
    dispatch(callForLogin());
    axios
    // login api call
      .post("", {
        email: cred.username,
        password: cred.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.data.accessToken);
        localStorage.setItem("refreshToken", res.data.data.refreshToken);
        localStorage.setItem("expiresIn", res.data.data.expiresIn);
        dispatch(loginSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(loginFailure(err.response.data.error));
      });
  };
};

// Order
export const callForOrder = () => {
  return {
    type: ActionTypes.USER_ORDERS_CALL,
  };
};

export const orderSuccess = (orders: OrderRes) => {
  return {
    type: ActionTypes.USER_ORDERS_SUCCESS,
    payload: orders,
  };
};

export const orderFailure = (error: string | undefined) => {
  return {
    type: ActionTypes.USER_ORDERS_FAILURE,
    payload: error,
  };
};

export const fetchOrders = (UrlObj?: OrderFilter | undefined) => {
  return function (dispatch: AppDispatch) {
    dispatch(callForOrder());
    orderDetails(UrlObj)
      .then((res) => {
        dispatch(orderSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(orderFailure(err.response.data.error));
      });
  };
};

//  USER DETAILS
export const userFetchSuccess = (res: UserDetails) => {
  return {
    type: ActionTypes.USER_DETAILS_SUCCESS,
    payload: res,
  };
};

export const userFetchFailure = (error: string | undefined) => {
  return {
    type: ActionTypes.USER_DETAILS_FAILURE,
    payload: error,
  };
};

export const userFetch = () => {
  return function (dispatch: AppDispatch) {
    userDetails()
      .then((res) => {
        dispatch(userFetchSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(userFetchFailure(err.response.data.error));
      });
  };
};

// LOGOUT
export const logoutSuccess = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};

export const logoutfailure = () => {
  return {
    type: ActionTypes.LOGOUT_FAILURE,
  };
};

export const logOutSubmit = (token: string | undefined) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return function (dispatch: any) {
    axios
    // logout api call
      .post(
        "",
        {},
        {
          headers: headers,
        }
      )
      .then((res) => {
        dispatch(logoutSuccess());
      })
      .catch((err) => {
        dispatch(logoutfailure());
      });
  };
};
