import { useState } from "react";
import { fetchAxios } from "../utils/axios";

/* --------------------------------------------------------------
 * --------- Use when making API calls from a component ---------
 * -------------------------------------------------------------- */

const useAxios = () => {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(false);

  // TODO -> Create Loading Modal and Error Modal

  /** 
  * @param type get, put, post, delete
  * @param endpoint the endpoint to connect
  * @param body the body data of the request
  * @param extraHeaders any additional headers
  */
  const fetchAPI = async (type, endpoint, body=null, extraHeaders=[]) => {
    try {
      setData(false);
      setError(false);
      setStatus(false);
      setLoading(true);

      const { data, status } = await fetchAxios(type, endpoint, body, extraHeaders);
      console.log(`Fetched succeed with status ${status} and data:\n\t ${JSON.stringify(data)}`);
      setData(data);
      setStatus(status);
    } catch (err) {
      console.log("Fetched failed:\n", err);
      setError(true);
      setStatus(err.response?.status);
      setData(err.response?.data);
    } finally {
      setLoading(false);
    }
  }

  return { fetchAPI, data, loading, status, error, setData };
};

export default useAxios;