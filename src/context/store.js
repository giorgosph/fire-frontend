import { createContext, useState, useMemo } from "react";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { fetchAxios } from "../utils/axios";
import { TOKEN_EP } from "../utils/url";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: (token) => {},
});

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(false); 
  
  const decodeToken = (token) => {
    try {
      const { auth, exp } = jwtDecode(token.split(" ")[1]);
      console.log("TOKEN:\n" + token + "\nAuth:\n" + auth + "\nExpiriration:\n" + exp);
      return { auth, exp };
    } catch (err) {
      console.error("Error decoding token:", err);
      return false;
    }
  };
  
  function authenticate(token) {
    const currentTime = Math.floor(Date.now() / 1000);
    
    const dToken = decodeToken(token);
    const { auth, exp } = dToken;
    
    try {
      if(auth) {

        if(exp > currentTime) {
          setToken(token);
          Cookies.set("jwtToken", token);
        } else if (exp > currentTime - 24 * 60 * 60) {
          const { data } = fetchAxios('get', TOKEN_EP, null, { Authorization: token });

          Cookies.set("jwtToken", data.token);
          console.log("New token: ", data.token);
        } else {
          Cookies.remove("jwtToken");
        }

      } else throw new Error("Invalid token provided: ", auth);
    } catch (err) {
      console.error("Error authenticating token:", err);
      alert("Something went wrong\nKindly contact your administrator!");
    }

    console.log("TOKEN has been set");
  }

  function logout() {
    setToken(false);
    Cookies.remove("jwtToken");
  }

  const value = useMemo(() => {
    return {
      token,
      isAuthenticated: !!token,
      authenticate,
      logout,
    };
  }, [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;