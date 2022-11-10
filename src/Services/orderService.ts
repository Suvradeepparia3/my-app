import { OrderFilter } from "../Modals/orderResModal";
import ServiceClient from "./serviceClientConfig";

const serviceClient = new ServiceClient({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const orderDetails = (UrlObj?: OrderFilter | undefined) => {
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

  return serviceClient.get(`/api/orders?` + Url);
};
