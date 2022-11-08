import axios from "axios";
import { LoginModal } from "../Modals/loginModal";
import { OrderRes } from "../Modals/orderResModal";
import { AppDispatch } from "./Store";

export const CALL_FOR_LOGIN = "CALL_FOR_LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const USER_DETAILS_SUCCESS = "USER_DETAILS_SUCCESS";
export const USER_DETAILS_FAILURE = "USER_DETAILS_FAILURE";

export const USER_ORDERS_CALL = "USER_ORDERS_CALL";
export const USER_ORDERS_SUCCESS = "USER_ORDERS_SUCCESS";
export const USER_ORDERS_FAILURE = "USER_ORDERS_FAILURE";

// LOGIN
export const callForLogin = () => {
  return {
    type: CALL_FOR_LOGIN,
  };
};

export const loginSuccess = (userDetails: any) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userDetails,
  };
};

export const loginFailure = (error: any) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

export const logInSubmit = (cred: LoginModal) => {
  return function (dispatch: any) {
    dispatch(callForLogin());
    axios
      .post("https://dev.uiplonline.com:3050/api/auth/login", {
        email: cred.username,
        password: cred.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.data.accessToken);
        dispatch(loginSuccess(res.data.data));
        dispatch(userFetch(res.data.data.accessToken));
      })
      .catch((err) => {
        dispatch(loginFailure(err));
      });
  };
};

// Order
export const callForOrder = () => {
  return {
    type: USER_ORDERS_CALL,
  };
};

export const orderSuccess = (orders: OrderRes) => {
  return {
    type: USER_ORDERS_SUCCESS,
    payload: orders,
  };
};

export const orderFailure = (error: any) => {
  return {
    type: USER_ORDERS_FAILURE,
    payload: error,
  };
};

export const fetchOrders = (token: any, filter: string) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return function (dispatch: AppDispatch) {
    dispatch(callForOrder());
    axios
      .get(
        filter
          ? `https://dev.uiplonline.com:3050/api/orders?${filter}`
          : `https://dev.uiplonline.com:3050/api/orders`,
        {
          headers: headers,
        }
      )
      .then((res) => {
        dispatch(orderSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(orderFailure(err));
      });
  };
};

//  USER DETAILS
export const userFetchSuccess = (res: any) => {
  return {
    type: USER_DETAILS_SUCCESS,
    payload: res,
  };
};

export const userFetchFailure = (err: any) => {
  return {
    type: USER_DETAILS_FAILURE,
    payload: err,
  };
};

export const userFetch = (token: any) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return function (dispatch: any) {
    axios
      .get("https://dev.uiplonline.com:3050/api/users/token/user-info", {
        headers: headers,
      })
      .then((res) => {
        dispatch(userFetchSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(userFetchFailure(err));
      });
  };
};

// LOGOUT
export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const logoutfailure = () => {
  return {
    type: LOGOUT_FAILURE,
  };
};

export const logOutSubmit = (token: any) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return function (dispatch: any) {
    axios
      .post(
        "https://dev.uiplonline.com:3050/api/auth/logout",
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
