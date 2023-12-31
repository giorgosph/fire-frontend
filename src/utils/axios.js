import axios from "axios";

/**
 * Generic axios calls
 * 
 * @warning Use try/catch every time you use api()
 * @param type -> get, put, post, etc.
 */
export const fetchAxios = async (type, endpoint, body=null, extraHeaders=[]) => {
  const options = {
    url: endpoint,
    method: type,
    data: body,
    headers: {
      Accept: "application/json",
      ...extraHeaders,
    }
  };

  const response = await axios(options);
  return { data: response.data, status: response.status }
}
