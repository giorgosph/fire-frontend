import { useContext, useEffect, useState } from "react";

import useAxios from "./useAxios";
import { AuthContext } from "../context/store";
import { LOGIN_EP } from "../utils/url";

const useLogin = () => {
  const [password, setPassword] = useState();

  const authCtx = useContext(AuthContext);
  const { data, loading, error, fetchAPI } = useAxios();

  const handleSubmit = () => {
    fetchAPI('get', LOGIN_EP, null, { password }); 
  };

  useEffect(() => {
    if(!loading && data) authCtx.authenticate(data.token);
    else if(!loading && error) alert("Wrong password provided");
  }, [data, loading, error]);

  return { loading, password, setPassword, handleSubmit }
}

export default useLogin;