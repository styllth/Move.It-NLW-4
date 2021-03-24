import axios from "axios";

export default function api(baseUrl: string, config?: {}) {
  return axios.create({ baseURL: baseUrl, ...config });
}
