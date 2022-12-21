import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export default class ServiceClient {
  client: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.client = axios.create(config);

    this.client.interceptors.request.use(
      async (config) => {
        let token = getToken();
        let expireDate = localStorage.getItem("expiresIn")!;
        const tokenExp = new Date(+expireDate * 1000);
        const refreshToken = localStorage.getItem("refreshToken");
        const today = new Date();

        if (!!tokenExp && !!token) {
          if (tokenExp < today) {
            await axios
              .get(
                //refresh token api
                "" +
                  refreshToken
              )
              .then((response) => {
                token = response.data.tokens.accessToken;
                if (!!token) {
                  setToken(token);
                }
                localStorage.setItem(
                  "refreshToken",
                  response.data.tokens.refreshToken
                );
                localStorage.setItem(
                  "expiresIn",
                  response.data.tokens.expiresIn
                );
              })
              .catch((err) => {
                console.log(err);
              });
          }

          if (!!config.headers) {
            config.headers["Authorization"] = "Bearer " + token;
          } else {
            config.headers = {};
            config.headers["Authorization"] = "Bearer " + token;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        return Promise.reject(error);
      }
    );
  }

  get(endpoint: string) {
    return this.client.get<any>(endpoint);
  }

  post(endpoint: string, payload: any) {
    return this.client.post<any>(endpoint, payload);
  }
}

const getToken = (): string | null => {
  return localStorage.getItem("token");
};
const setToken = (token: string) => {
  localStorage.setItem("token", token);
};
