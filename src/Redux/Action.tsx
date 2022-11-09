import axios from "axios";
import { LoginModal } from "../Modals/loginModal";
import { OrderFilter, OrderRes } from "../Modals/orderResModal";
import { UserDetails } from "../Modals/userDetailsModal";
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
      .post("https://dev.uiplonline.com:3050/api/auth/login", {
        email: cred.username,
        password: cred.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.data.accessToken);
        localStorage.setItem("refreshToken", res.data.data.refreshToken);
        localStorage.setItem("expiresIn", res.data.data.expiresIn);
        dispatch(loginSuccess(res.data.data));
        dispatch(userFetch(res.data.data.accessToken));
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

export const fetchOrders = (
  token: string | undefined,
  UrlObj?: OrderFilter | undefined
) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  let Url = `page=${UrlObj?.page}&pageSize=${UrlObj?.pageSize}`;
  if (UrlObj?.search !== "") {
    Url = Url + `&search=${UrlObj?.search}`;
  }
  if (UrlObj?.kitchenName !== "") {
    Url = Url + `&kitchenName=${UrlObj?.kitchenName}`;
  }
  if (UrlObj?.selectedOrderStatus !== "") {
    Url = Url + `&orderStatus=${UrlObj?.selectedOrderStatus}`;
  }
  if (UrlObj?.selectedAssignedStatus !== "") {
    Url = Url + `&assignedStatus=${UrlObj?.selectedAssignedStatus}`;
  }
  if (UrlObj?.orderFromState !== "") {
    Url = Url + `&orderSource=${UrlObj?.orderFromState}`;
  }
  if (UrlObj?.orderFieldState !== "") {
    Url = Url + `&field=${UrlObj?.orderFieldState}`;
  }

  if (UrlObj?.orderSortState !== "") {
    Url = Url + `&sort=${UrlObj?.orderSortState}`;
  }

  if (UrlObj?.startDate !== "") {
    Url = Url + `&startDate=${UrlObj?.startDate}`;
  }

  if (UrlObj?.endDate !== "") {
    Url = Url + `&endDate=${UrlObj?.endDate}`;
  }

  return function (dispatch: AppDispatch) {
    dispatch(callForOrder());
    axios
      .get(`https://dev.uiplonline.com:3050/api/orders?` + Url, {
        headers: headers,
      })
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

export const userFetch = (token: string | undefined) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return function (dispatch: AppDispatch) {
    axios
      .get("https://dev.uiplonline.com:3050/api/users/token/user-info", {
        headers: headers,
      })
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
