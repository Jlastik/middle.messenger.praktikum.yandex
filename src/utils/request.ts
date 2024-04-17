import { queryStringify } from "./utils.ts";
import { BASE_PATH } from "../const.ts";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

type OptionsType = {
  timeout?: number;
  headers?: Record<string, string>;
  method?: string;
  data?: Record<string, unknown>;
};

type HTTPMethod = <Res>(
  url: string,
  options?: OptionsType,
) => Promise<{ data: Res; status: number }>;

export class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout,
    );
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout,
    );
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout,
    );
  };

  request = <Res>(url: string, options: OptionsType = {}, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise<{ data: Res; status: number }>(function (
      resolve,
      reject,
    ) {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        BASE_PATH + (isGet && !!data ? `${url}${queryStringify(data)}` : url),
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.withCredentials = true;
      xhr.onload = function () {
        let json: Res;

        try {
          json = JSON.parse(xhr.response);
        } catch (e) {
          json = xhr.response;
        }

        resolve({
          data: json,
          status: xhr.status,
        });
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

const request = new HTTPTransport();

export default request;
