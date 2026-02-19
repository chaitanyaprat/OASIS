type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  //check back later
  body?: BodyInit | null;
  cookie?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  cache?: RequestCache;
};

export function get(url: string, options?: RequestOptions) {
  return fetch(url, { ...options, method: "GET" }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
}

export function post(url: string, options?: RequestOptions) {
  return fetch(url, { ...options, method: "POST" }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
}
