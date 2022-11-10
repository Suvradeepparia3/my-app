import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export default class ServiceClient {
  client: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.client = axios.create(config);

    this.client.interceptors.request.use(
      (config) => {
        let token = getToken();
        let expireDate = localStorage.getItem("expiresIn")!;
        const tokenExp = new Date(+expireDate * 1000);
        const refreshToken = localStorage.getItem("refreshToken");
        const today = new Date();

        if (!!tokenExp && !!token) {
          if (tokenExp > today) {
            axios
              .get(
                "https://dev.uiplonline.com:3050/api/auth/generate-token?refreshToken=" +
                  refreshToken
              )
              .then((response) => {
                token = response.data.tokens.accessToken;
                console.log("first", token);
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

          let token2 = getToken();
          if (!!config.headers) {
            console.log("2", token);
            config.headers["Authorization"] = "Bearer " + token2;
          } else {
            config.headers = {};
            config.headers["Authorization"] = "Bearer " + token2;
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
