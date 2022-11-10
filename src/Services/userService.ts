import ServiceClient from "./serviceClientConfig";

const serviceClient = new ServiceClient({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const userDetails = () => {
  return serviceClient.get("/api/users/token/user-info");
};
