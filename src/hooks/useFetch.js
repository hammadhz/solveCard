import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function useFetch() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function api(method, url, data, options) {
    console.log(options, "options");
    try {
      setLoading(true);
      const response = await axiosInstance({
        method,
        url,
        data,
        headers: options,
      });
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  const post = async (url, data, options) =>
    await api("POST", url, data, options);
  const get = async (url, options) => await api("GET", url, options);
  const put = async (url, data, options) =>
    await api("PUT", url, data, options);
  const patch = async (url, data, options) =>
    await api("PATCH", url, data, options);
  const deleteRequest = async (method, url, options) =>
    await api("DELETE", url, options);

  return { data, error, loading, get, post, deleteRequest, put, patch };
}

export default useFetch;
